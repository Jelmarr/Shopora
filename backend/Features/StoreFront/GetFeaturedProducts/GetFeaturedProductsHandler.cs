using backend.Core.Exceptions;
using backend.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Features.StoreFront.GetFeaturedProducts;

public class GetFeaturedProductsHandler
{

    private readonly AppDbContext _db;

    public GetFeaturedProductsHandler(AppDbContext db)
    {
        _db = db;
    }

    public async Task<List<GetFeaturedProductsResponse>> Handle(Guid storeId, CancellationToken ct)
    {

        var featuredProducts = await _db.Products
            .AsNoTracking()
            .Take(4)
            .Where(product => product.IsFeatured && product.StoreId == storeId)
            .Select(product => new GetFeaturedProductsResponse
            {
                Id = product.Id,
                Name = product.Name,
                CategoryName = product.Category.Name,
                Images = product.Images
                    .Select(img => img.ImageUrl)
                    .ToList(),
                PrimaryImage = product.Images
                    .Where(img => img.IsPrimary)
                    .Select(img => img.ImageUrl)
                    .FirstOrDefault(),
                IsFeatured = product.IsFeatured,
                Price = product.Price,
                ComparePrice = product.CompareAtPrice,
                Stock = product.Stock,
                CreatedAt = product.CreatedAt
            })
            .OrderByDescending(product => product.CreatedAt)
            .ToListAsync(ct);

        return featuredProducts;

    }

}