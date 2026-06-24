using System.Security.Claims;
using backend.Core.Extensions;
using backend.Data;
using backend.Features.Categories.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Features.Categories.GetCategories;

public static class GetCategories
{
    public static void MapGetCategories(this IEndpointRouteBuilder app)
    {
        app.MapGet("/api/categories", async (
            ClaimsPrincipal user,
            AppDbContext db,
            CancellationToken ct,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 5,
            [FromQuery] string? search = null,
            [FromQuery] string? sortBy = null,
            [FromQuery] string? sortOrder = null,
            [FromQuery] bool all = false
        ) =>
        {

            var storeId = user.GetStoreId();

            var globalStoreQuery = db.Categories.Where(cat => cat.StoreId == storeId);
            var tableQuery = db.Categories.Where(cat => cat.StoreId == storeId);

            if (!string.IsNullOrEmpty(search))
            {

                var searchKeyword = search.Trim();

                tableQuery = tableQuery.Where(cat => EF.Functions.ILike(cat.Name, $"%{searchKeyword}%"));
            }

            bool isDescending = sortOrder?.ToLower() == "desc";

            tableQuery = sortBy?.ToLower() switch
            {
                "name" => isDescending
                    ? tableQuery.OrderByDescending(p => p.Name)
                    : tableQuery.OrderBy(p => p.Name),

                "productcount" => isDescending
                    ? tableQuery.OrderByDescending(p => p.Products.Count())
                    : tableQuery.OrderBy(p => p.Products.Count()),

                "isactive" => isDescending
                    ? tableQuery.OrderByDescending(p => p.Status == CategoryStatus.Active)
                    : tableQuery.OrderBy(p => p.Status == CategoryStatus.Inactive),

                _ => tableQuery.OrderByDescending(p => p.CreatedAt)
            };

            var totalCount = await globalStoreQuery.CountAsync(ct);

            var activeCategories = await globalStoreQuery
                .CountAsync(cat => cat.Status == CategoryStatus.Active, ct);

            var productsCategorized = await globalStoreQuery
                .SelectMany(cat => cat.Products)
                .CountAsync(ct);

            var parentLookups = await globalStoreQuery
                .Where(cat => cat.ParentCategoryId == null)
                .Select(cat => new { cat.Id, cat.Name })
                .AsNoTracking()
                .ToListAsync();

            var categories = await tableQuery
                .AsNoTracking()
                .Select(cat => new GetCategoriesResponse
                {
                    Id = cat.Id,
                    Name = cat.Name,
                    Status = cat.Status,
                    ParentCategoryId = cat.ParentCategoryId,
                    ParentCategoryName = cat.ParentCategory != null ? cat.ParentCategory.Name : null,
                    ProductCount = cat.Products.Count()
                })
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync(ct);

            return Results.Ok(new
            {
                categories,
                currentPage = page,
                totalCount,
                activeCategories,
                productsCategorized,
                parentLookups,
                totalPages = (int)Math.Ceiling(totalCount / (double)pageSize)
            });

        })
        .WithTags("Category")
        .RequireAuthorization();
    }
}