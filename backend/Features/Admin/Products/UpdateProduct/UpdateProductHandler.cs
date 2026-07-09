using System.Security.Claims;
using System.Text.Json;
using backend.Core.Exceptions;
using backend.Core.Exceptions.ValidatonException;
using backend.Core.Extensions;
using backend.Core.Extensions.StringExtension;
using backend.Data;
using backend.Features.Admin.Products.Models;
using backend.Features.Admin.Products.Services;
using backend.Features.Admin.Products.CreateProduct;
using Microsoft.EntityFrameworkCore;

namespace backend.Features.Admin.Products.UpdateProduct;

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
            var categoryExists = await _db.Categories.AnyAsync(cat => cat.Id == request.CategoryId && cat.StoreId == storeId, ct);

            if (!categoryExists)
            {
                throw new ValidationException("categoryId", "A category with this name doesn't exist in your store");
            }

            // 1. CRITICAL EXTENSION: Include all option and variant tables so EF tracks changes across the graph
            var product = await _db.Products
                .Include(p => p.Images)
                .Include(p => p.Category)
                .Include(p => p.Options)
                    .ThenInclude(po => po.Values)
                .Include(p => p.Variants)
                    .ThenInclude(pv => pv.Options)
                        .ThenInclude(vo => vo.ProductOptionValue)
                            .ThenInclude(po => po.ProductOption)
                .FirstOrDefaultAsync(p => p.Id == request.Id && p.StoreId == storeId, ct);

            if (product is null)
            {
                throw new NotFoundException("Product does not exist.");
            }

            var productNameExists = await _db.Products
                .Where(p => !p.IsDeleted)
                .AnyAsync(p => p.StoreId == storeId &&
                p.Id != product.Id &&
                EF.Functions.ILike(p.Name, request.Name.Trim()),
                ct);

            if (productNameExists)
            {
                throw new ValidationException("name", "A product with this name already exists in your store.");
            }

            if (!string.IsNullOrWhiteSpace(request.SKU))
            {
                var skuExists = await _db.Products
                    .AnyAsync(p => p.StoreId == storeId &&
                                   p.Id != product.Id &&
                                   p.SKU != null &&
                                   EF.Functions.ILike(p.SKU, request.SKU.Trim()), ct);

                if (skuExists)
                {
                    throw new ValidationException("sku", "SKU already exists");
                }
            }

            // Update product base fields
            product.CategoryId = request.CategoryId;
            product.Name = request.Name.ToCapitalized();
            product.SKU = request.SKU;
            product.Description = request.Description;
            product.Price = request.Price;
            product.CompareAtPrice = request.CompareAtPrice;
            product.IsTrackInventory = request.IsTrackInventory;
            product.CostPrice = request.CostPrice;
            product.Stock = request.Stock;
            product.LowStockThreshold = request.LowStockThreshold;
            product.IsFeatured = request.IsFeatured;
            product.Status = request.Status;

            // Handle images update
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

                foreach (var (newUpload, index) in newUploadResults.Select((img, i) => (img, i)))
                {
                    product.Images.Add(new ProductImage
                    {
                        ImageUrl = newUpload.Url,
                        PublicId = newUpload.PublicId,
                        IsPrimary = index == 0
                    });
                }
            }

            // =================================================================
            // VARIANT SYNCHRONIZATION: Sync variants on updates
            // =================================================================
            var jsonOptions = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

            var incomingOptions = string.IsNullOrEmpty(request.ProductOptions)
                ? []
                : JsonSerializer.Deserialize<List<OptionJsonDto>>(request.ProductOptions, jsonOptions) ?? [];

            var incomingVariants = string.IsNullOrEmpty(request.ProductVariants)
                ? []
                : JsonSerializer.Deserialize<List<VariantJsonDto>>(request.ProductVariants, jsonOptions) ?? [];

            // 2. Clear out old Option trees and Variants completely to prevent orphaned child constraints
            if (product.Options.Any())
            {
                _db.ProductOptions.RemoveRange(product.Options);
            }
            if (product.Variants.Any())
            {
                _db.ProductVariants.RemoveRange(product.Variants);
            }

            // 3. Rebuild the new configuration options structure maps
            var valueLookup = new Dictionary<string, ProductOptionValue>();

            foreach (var optDto in incomingOptions)
            {
                var option = new ProductOption
                {
                    Id = Guid.NewGuid(),
                    ProductId = product.Id,
                    Name = optDto.Name.Trim()
                };
                _db.ProductOptions.Add(option);

                foreach (var valDto in optDto.Values)
                {
                    var optValue = new ProductOptionValue
                    {
                        Id = Guid.NewGuid(),
                        ProductOptionId = option.Id,
                        Value = valDto.Value.Trim()
                    };
                    _db.ProductOptionValues.Add(optValue);

                    string trackingKey = $"{optDto.Name.ToLower().Trim()}:{valDto.Value.ToLower().Trim()}";
                    valueLookup[trackingKey] = optValue;
                }
            }

            // 4. Map and append structural mutations back onto your database contexts
            foreach (var varDto in incomingVariants)
            {
                var variant = new ProductVariant
                {
                    Id = Guid.NewGuid(),
                    ProductId = product.Id,
                    StoreId = storeId,
                    SKU = string.IsNullOrWhiteSpace(varDto.SKU) ? null : varDto.SKU.Trim(),
                    PriceOverride = varDto.PriceOverride,
                    Stock = varDto.Stock ?? 0
                };
                _db.ProductVariants.Add(variant);

                foreach (var link in varDto.VariantOptionValues)
                {
                    string targetKey = $"{link.OptionName.ToLower().Trim()}:{link.ValueText.ToLower().Trim()}";

                    if (valueLookup.TryGetValue(targetKey, out var matchedValueEntity))
                    {
                        var joinRelation = new ProductVariantOption
                        {
                            ProductVariantId = variant.Id,
                            ProductOptionValueId = matchedValueEntity.Id
                        };
                        _db.ProductVariantOptions.Add(joinRelation);
                    }
                }
            }
            // =================================================================

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