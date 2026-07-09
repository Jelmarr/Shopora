using System.Security.Claims;
using backend.Core.Exceptions;
using backend.Core.Extensions;
using backend.Data;
using backend.Features.Admin.Products.Services;
using Microsoft.EntityFrameworkCore;

namespace backend.Features.Admin.Products.DeleteProduct;

public class DeleteProductHandler
{
    private readonly AppDbContext _db;
    private readonly ICloudinaryService _cloudinaryService;

    public DeleteProductHandler(AppDbContext db, ICloudinaryService cloudinaryService)
    {
        _db = db;
        _cloudinaryService = cloudinaryService;
    }

    public async Task<DeleteProductResponse> Handle(ClaimsPrincipal user, Guid Id, CancellationToken ct)
    {

        var storeId = user.GetStoreId();

        var product = await _db.Products
            .Include(product => product.Images)
            .FirstOrDefaultAsync(product => product.Id == Id && product.StoreId == storeId, ct);

        if (product is null)
        {
            throw new NotFoundException("Product doesn't exist");
        }

        using var transaction = await _db.Database.BeginTransactionAsync(ct);

        var publicIdsToDelete = product.Images
                .Where(img => !string.IsNullOrEmpty(img.PublicId))
                .Select(img => img.PublicId)
                .ToList();

        try
        {

            product.IsDeleted = true;
            product.DeletedAt = DateTime.UtcNow;

            if (product.Images.Any())
            {
                _db.ProductsImages.RemoveRange(product.Images);
                product.Images.Clear();
            }

            await _db.SaveChangesAsync(ct);
            await transaction.CommitAsync(ct);

            if (publicIdsToDelete.Any())
            {
                var deleteTasks = publicIdsToDelete.Select(publicId => _cloudinaryService.DeleteImageAsync(publicId));
                await Task.WhenAll(deleteTasks);
            }

            return new DeleteProductResponse(product.Id, product.Status, "Product successfully deleted.");

        }
        catch (Exception)
        {
            await transaction.RollbackAsync(ct);

            throw;
        }

    }
}