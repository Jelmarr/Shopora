using System.Security.Claims;
using backend.Core.Extensions;
using backend.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Features.Admin.Categories.GetCategoriesLookup;

public static class GetCategoriesLookup
{
    public static void MapGetCategoriesLookup(this IEndpointRouteBuilder app)
    {
        app.MapGet("/api/categories/lookup", async (
            ClaimsPrincipal user,
            AppDbContext db,
            CancellationToken ct
        ) =>
        {

            var storeId = user.GetStoreId();

            var lookups = await db.Categories
                .Where(cat => cat.StoreId == storeId && !cat.IsDeleted)
                .AsNoTracking()
                .Select(cat => new GetCategoriesLookupResponse
                {
                    Id = cat.Id,
                    Name = cat.Name,
                    ParentCategoryName = cat.ParentCategory != null ? cat.ParentCategory.Name : null
                })
                .OrderBy(cat => cat.Name)
                .ToListAsync(ct);

            return Results.Ok(lookups);
        })
        .WithTags("Category")
        .RequireAuthorization();
    }
}