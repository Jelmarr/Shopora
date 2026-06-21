using backend.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Features.Stores.GetStores;

public static class GetStores
{
    public static void MapGetStores(this IEndpointRouteBuilder app)
    {
        app.MapGet("/api/stores", async (
            AppDbContext db,
            CancellationToken ct
        ) =>
        {

            var stores = await db.Stores
                .AsNoTracking()
                .Select(store => new GetStoresResponse
                {

                    Id = store.StoreId,
                    Name = store.Name,
                    LogoUrl = store.LogoUrl != null ? store.LogoUrl : "No Logo",
                    Slug = store.Slug
                })
                .ToListAsync(ct);

            return Results.Ok(stores);

        })
        .RequireAuthorization()
        .WithTags("Store");
    }
}