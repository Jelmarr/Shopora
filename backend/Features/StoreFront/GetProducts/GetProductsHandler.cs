using backend.Core.Exceptions;
using backend.Data;
using backend.Features.Admin.Products.Enums;
using Microsoft.EntityFrameworkCore;

namespace backend.Features.StoreFront.GetProducts;

public class GetProductHandler
{

    private readonly AppDbContext _db;

    public GetProductHandler(AppDbContext db)
    {
        _db = db;
    }

    public async Task<List<GetProductResponse>> Handle(
        Guid storeId,
        GetProductsFilter filters,
        CancellationToken ct)
    {

        var query = _db.Products
            .AsNoTracking()
            .Where(product => product.StoreId == storeId && product.Status == ProductStatus.Active);

        if (!string.IsNullOrEmpty(filters.Search))
        {
            var normalizedSearch = filters.Search.Trim();

            query = query.Where(p => EF.Functions.ILike(p.Name, $"%{normalizedSearch}%"));
        }

        if (!string.IsNullOrEmpty(filters.Search))
        {
            query = query.Where(p => p.Category.Name.ToLower() == filters.Category!.ToLower());
        }

        query = filters.SortBy?.ToLower() switch
        {
            "featured" => query.Where(p => p.IsFeatured),

            "a-z" => query.OrderBy(p => p.Name),

            "z-a" => query.OrderByDescending(p => p.Name),

            "low-to-high" => query.OrderBy(p => p.Price),

            "high-to-low" => query.OrderByDescending(p => p.Price),

            "old-to-new" => query.OrderBy(p => p.CreatedAt),

            "new-to-old" => query.OrderByDescending(p => p.CreatedAt),

            _ => query.OrderByDescending(p => p.CreatedAt)
        };

        var products = await query
            .Select(product => new GetProductResponse
            {
                Id = product.Id,
                Name = product.Name,
                CategoryId = product.CategoryId,
                CategoryName = product.Category.Name,
                Stock = product.Stock,
                IsFeatured = product.IsFeatured,
                Price = product.Price,
                ComparePrice = product.CompareAtPrice,
                Images = product.Images
                    .Select(image => image.ImageUrl)
                    .ToList()
            })
            .ToListAsync(ct);

        if (products.Count == 0)
        {
            throw new ConflictException("There's no product in this store");
        }

        return products;

    }

}