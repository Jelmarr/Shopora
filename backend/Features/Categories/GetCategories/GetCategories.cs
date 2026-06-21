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
            [FromQuery] string? search = null
        ) =>
        {

            var storeId = user.GetStoreId();

            var baseQuery = db.Categories.Where(cat => cat.StoreId == storeId);

            if (!string.IsNullOrEmpty(search))
            {

                var searchKeyword = search.Trim();

                baseQuery = baseQuery.Where(cat => EF.Functions.ILike(cat.Name, $"%{searchKeyword}%"));
            }

            var totalCount = await baseQuery.CountAsync(ct);

            var activeCategories = await baseQuery
                .CountAsync(cat => cat.Status == CategoryStatus.Active, ct);

            var productsCategorized = await baseQuery
                .SelectMany(cat => cat.Products)
                .CountAsync(ct);

            var categories = await baseQuery
                .AsNoTracking()
                .Select(cat => new GetCategoriesResponse
                {
                    Id = cat.Id,
                    Name = cat.Name,
                    Description = cat.Description ?? string.Empty,
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
                totalPages = (int)Math.Ceiling(totalCount / (double)pageSize)
            });

        })
        .WithTags("Category")
        .RequireAuthorization();
    }
}