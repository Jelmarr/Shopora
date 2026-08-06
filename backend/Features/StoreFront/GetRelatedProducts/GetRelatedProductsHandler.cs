using backend.Data;
using backend.Features.Admin.Products.Enums;
using Microsoft.EntityFrameworkCore;

namespace backend.Features.StoreFront.GetRelatedProducts;

public class GetRelatedProductsHandler
{
    private readonly AppDbContext _db;

    public GetRelatedProductsHandler(AppDbContext db)
    {
        _db = db;
    }

    public async Task<List<GetRelatedProductsResponse>> Handle(
        Guid storeId,
        Guid currentProductId,
        Guid categoryId,
        CancellationToken ct
    )
    {

        var relatedProducts = await _db.Products
            .AsNoTracking()
            .Where(p =>
                p.StoreId == storeId
                && p.Status == ProductStatus.Active
                && p.CategoryId == categoryId
                && p.Id != currentProductId)
            .OrderByDescending(p => p.CreatedAt)
            .Take(4)
            .Select(p => new GetRelatedProductsResponse
            {
                Id = p.Id,
                Name = p.Name,
                CategoryId = p.CategoryId,
                CategoryName = p.Category.Name,
                ComparePrice = p.CompareAtPrice,
                Price = p.Price,
                Images = p.Images.Select(img => img.ImageUrl).ToList()
            })
            .ToListAsync(ct);


        if (relatedProducts.Count < 4)
        {
            var existingIds = relatedProducts.Select(p => p.Id).ToList();
            existingIds.Add(currentProductId);

            var fillCount = 4 - relatedProducts.Count;

            var storeFallbackProducts = await _db.Products
            .AsNoTracking()
            .Where(p => p.StoreId == storeId
                     && p.Status == ProductStatus.Active
                     && !existingIds.Contains(p.Id))
            .OrderByDescending(p => p.CreatedAt)
            .Take(fillCount)
            .Select(p => new GetRelatedProductsResponse
            {
                Id = p.Id,
                Name = p.Name,
                CategoryId = p.CategoryId,
                CategoryName = p.Category.Name,
                ComparePrice = p.CompareAtPrice,
                Price = p.Price,
                Images = p.Images.Select(img => img.ImageUrl).ToList()
            })
            .ToListAsync(ct);

            relatedProducts.AddRange(storeFallbackProducts);
        }

        return relatedProducts;

    }
}