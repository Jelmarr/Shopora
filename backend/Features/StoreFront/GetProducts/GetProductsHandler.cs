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

    public async Task<PageProductsResponse> Handle(
        Guid storeId,
        GetProductsQuery query,
        CancellationToken ct)
    {

        var dbQuery = _db.Products
            .AsNoTracking()
            .Where(product => product.StoreId == storeId && product.Status == ProductStatus.Active);

        if (!string.IsNullOrEmpty(query.Search))
        {
            var normalizedSearch = query.Search.Trim();

            dbQuery = dbQuery.Where(p => EF.Functions.ILike(p.Name, $"%{normalizedSearch}%"));
        }

        if (query.Categories != null && query.Categories.Any())
        {
            dbQuery = dbQuery.Where(p => query.Categories.Contains(p.Category.Name.Trim()));
        }

        if (query.MinPrice.HasValue)
        {
            dbQuery = dbQuery.Where(p => p.Price >= query.MinPrice.Value);
        }

        if (query.MaxPrice.HasValue)
        {
            dbQuery = dbQuery.Where(p => p.Price <= query.MaxPrice.Value);
        }

        dbQuery = query.SortBy?.ToLower() switch
        {
            "featured" => dbQuery.OrderByDescending(p => p.IsFeatured).ThenByDescending(p => p.CreatedAt),

            "a-z" => dbQuery.OrderBy(p => p.Name),

            "z-a" => dbQuery.OrderByDescending(p => p.Name),

            "low-high" => dbQuery.OrderBy(p => p.Price),

            "high-low" => dbQuery.OrderByDescending(p => p.Price),

            "old-new" => dbQuery.OrderBy(p => p.CreatedAt),

            "new-old" => dbQuery.OrderByDescending(p => p.CreatedAt),

            _ => dbQuery.OrderByDescending(p => p.CreatedAt)
        };

        var totalCount = await dbQuery.CountAsync(ct);

        var products = await dbQuery
            .Skip((query.Page - 1) * query.PageSize)
            .Take(query.PageSize)
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

        var totalPages = totalCount == 0 ? 1 : (int)Math.Ceiling(totalCount / (double)query.PageSize);

        return new PageProductsResponse(
            Products: products,
            TotalCount: totalCount,
            CurrentPage: query.Page,
            TotalPages: totalPages
        );

    }

}