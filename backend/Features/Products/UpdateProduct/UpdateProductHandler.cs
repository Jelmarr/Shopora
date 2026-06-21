using System.Security.Claims;
using backend.Core.Exceptions;
using backend.Core.Extensions;
using backend.Data;
using backend.Features.Products.Models;
using backend.Features.Products.Services;
using Microsoft.EntityFrameworkCore;

namespace backend.Features.Products.UpdateProduct;

public class UpdateProductHandler
{
    private readonly AppDbContext _db;
    private readonly ICloudinaryService _cloudinaryService;
    public UpdateProductHandler(AppDbContext db, ICloudinaryService cloudinaryService)
    {
        _db = db;
        _cloudinaryService = cloudinaryService;
    }

    public async Task<UpdateProductResponse> Handle(
        ClaimsPrincipal user,
        UpdateProductRequest request,
        CancellationToken ct
    )
    {

        var storeId = user.GetStoreId();

        bool isReplacingImages = request.Images is not null && request.Images.Any();

        var newUploadResults = new List<CloudinaryUploadResult>();

        if (isReplacingImages)
        {
            var uploadTasks = request.Images!.Select(img => _cloudinaryService.UploadImageAsync(img, "products"));
            newUploadResults = (await Task.WhenAll(uploadTasks)).ToList();
        }

        using var transaction = await _db.Database.BeginTransactionAsync(ct);
        var oldPublicIdsToDelete = new List<string>();

        try
        {

            var categoryExists = await _db.Categories.AnyAsync(cat => cat.Id == request.CategoryId && cat.StoreId == storeId);

            if (!categoryExists)
            {
                throw new NotFoundException("Category not found.");
            }

            var product = await _db.Products
                .Include(p => p.Images)
                .Include(p => p.Category)
                .FirstOrDefaultAsync(p => p.Id == request.Id && p.StoreId == storeId, ct);

            if (product is null)
            {
                throw new NotFoundException("Product does not exists.");
            }

            var skuExists = await _db.Products.AnyAsync(
                p => p.SKU == request.SKU && p.StoreId == storeId && p.Id != product.Id,
                ct);

            if (skuExists)
            {
                throw new ConflictException("SKU already exists");
            }

            product.CategoryId = request.CategoryId;
            product.Name = request.Name;
            product.SKU = request.SKU;
            product.Description = request.Description;
            product.Price = request.Price;
            product.CompareAtPrice = request.CompareAtPrice;
            product.CostPrice = request.CostPrice;
            product.Stock = request.Stock;
            product.LowStockThreshold = request.LowStockThreshold;
            product.IsFeatured = request.IsFeatured;
            product.Status = request.Status;

            if (isReplacingImages)
            {
                foreach (var oldImage in product.Images)
                {
                    if (!string.IsNullOrEmpty(oldImage.PublicId))
                    {
                        oldPublicIdsToDelete.Add(oldImage.PublicId);
                    }
                }

                _db.ProductsImages.RemoveRange(product.Images);
                product.Images.Clear();

                foreach (var newUpload in newUploadResults)
                {
                    product.Images.Add(new ProductImage
                    {
                        ImageUrl = newUpload.Url,
                        PublicId = newUpload.PublicId
                    });
                }
            }

            await _db.SaveChangesAsync(ct);
            await transaction.CommitAsync(ct);

            if (isReplacingImages && oldPublicIdsToDelete.Any())
            {
                var deleteOldTasks = oldPublicIdsToDelete.Select(id => _cloudinaryService.DeleteImageAsync(id));
                await Task.WhenAll(deleteOldTasks);
            }

            return new UpdateProductResponse(product.Id, "Product updated successfully.");

        }
        catch (Exception)
        {

            await transaction.RollbackAsync(ct);

            if (isReplacingImages && newUploadResults.Any())
            {
                var deleteNewTasks = newUploadResults.Select(img => _cloudinaryService.DeleteImageAsync(img.PublicId));
                await Task.WhenAll(deleteNewTasks);
            }

            throw;

        }

    }
}