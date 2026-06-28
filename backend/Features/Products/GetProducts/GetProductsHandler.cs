using System.Security.Claims;
using backend.Core.Extensions;
using backend.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Features.Products.GetProducts;

public class GetProductsHandler
{
    private readonly AppDbContext _db;

    public GetProductsHandler(AppDbContext db)
    {
        _db = db;
    }

    public async Task<PageProductsRespose> Handle(
        ClaimsPrincipal user,
        GetProductsFilter filters,
        GetProductsPagination pagination,
        CancellationToken ct)
    {

        var storeId = user.GetStoreId();

        var query = _db.Products
            .AsNoTracking()
            .Include(p => p.Category)
            .Include(p => p.Images)
            .Where(p => p.StoreId == storeId && !p.IsDeleted);

        if (!string.IsNullOrEmpty(filters.Search))
        {
            var normalizedSearch = filters.Search.Trim();

            query = query.Where(p => EF.Functions.ILike(p.Name, $"%{normalizedSearch}%"));
        }

        if (filters.CategoryId.HasValue)
        {
            query = query.Where(p => p.CategoryId == filters.CategoryId.Value);
        }

        if (filters.Status.HasValue)
        {
            query = query.Where(p => p.Status == filters.Status.Value);
        }

        bool isDescending = filters.SortOrder?.ToLower() == "desc";

        query = filters.SortBy?.ToLower() switch
        {
            "createdAt" => isDescending
                ? query.OrderByDescending(p => p.CreatedAt)
                : query.OrderBy(p => p.CreatedAt),

            "name" => isDescending
                ? query.OrderByDescending(p => p.Name)
                : query.OrderBy(p => p.Name),

            "stock" => isDescending
                ? query.OrderByDescending(p => p.Stock)
                : query.OrderBy(p => p.Stock),

            _ => query.OrderByDescending(p => p.CreatedAt)
        };

        var totalCount = await query.CountAsync(ct);

        var products = await query
            .Select(product => new GetProductsResponse
            {
                Id = product.Id,
                CategoryName = product.Category != null ? product.Category.Name : "Uncategorized",
                Name = product.Name,
                Price = product.Price,
                Stock = product.Stock,
                IsFeatured = product.IsFeatured,
                IsTrackInventory = product.IsTrackInventory,
                Status = product.Status,
                Images = product.Images.Select(img => img.ImageUrl).ToList()
            })
            .Skip((pagination.Page - 1) * pagination.PageSize)
            .Take(pagination.PageSize)
            .ToListAsync(ct);

        return new PageProductsRespose(
            Products: products,
            TotalCount: totalCount,
            CurrentPage: pagination.Page,
            TotalPage: (int)Math.Ceiling(totalCount / (double)pagination.PageSize)
        );

    }

}