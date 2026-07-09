using System.Security.Claims;
using backend.Core.Extensions;
using backend.Data;
using backend.Features.Admin.Products.Enums;
using Microsoft.EntityFrameworkCore;

namespace backend.Features.Admin.Products.GetProducts;

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

        if (!string.IsNullOrEmpty(filters.Category))
        {
            query = query.Where(p => p.Category.Name.ToLower() == filters.Category.ToLower());
        }

        if (!string.IsNullOrEmpty(filters.Status) &&
            Enum.TryParse<ProductStatus>(filters.Status, ignoreCase: true, out var status))
        {
            query = query.Where(p => p.Status == status);
        }

        bool isDescending = filters.SortOrder?.ToLower() == "desc";

        query = filters.SortBy?.ToLower() switch
        {
            "createdat" => isDescending
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
            .Include(product => product.Category)
            .Include(product => product.Images)
            .Select(product => new GetProductsResponse
            {
                Id = product.Id,
                CategoryId = product.CategoryId,
                CategoryName = product.Category != null ? product.Category.Name : "Uncategorized",
                Name = product.Name,
                Stock = product.Stock,
                IsFeatured = product.IsFeatured,
                IsTrackInventory = product.IsTrackInventory,
                Status = product.Status,
                PrimaryImageUrl = product.Images
                    .Where(img => img.IsPrimary)
                    .Select(img => img.ImageUrl)
                    .FirstOrDefault(),
                CreatedAt = product.CreatedAt
            })
            .Skip((pagination.Page - 1) * pagination.PageSize)
            .Take(pagination.PageSize)
            .ToListAsync(ct);

        return new PageProductsRespose(
            Products: products,
            TotalCount: totalCount,
            CurrentPage: pagination.Page,
            TotalPages: (int)Math.Ceiling(totalCount / (double)pagination.PageSize)
        );

    }

}