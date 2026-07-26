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
            .Where(product => product.IsFeatured && product.StoreId == storeId)
            .Select(product => new GetFeaturedProductsResponse
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                PrimaryImageUrl = product.Images
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

        if (featuredProducts.Count == 0)
        {
            throw new ConflictException("There's no featured products in this store.");
        }

        return featuredProducts;

    }

}