using backend.Core.Exceptions;
using backend.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Features.StoreFront.GetStoreBySlug;

public static class GetStoreBySlug
{
    public static void MapGetStoreBySlug(this IEndpointRouteBuilder app)
    {
        app.MapGet("/api/store/{slug}", async (
            string slug,
            CancellationToken ct,
            AppDbContext db) =>
        {

            var storeSlug = await db.Stores
                .AsNoTracking()
                .Where(store => store.Slug == slug)
                .Select(store => new GetStoreBySlugResponse(store.StoreId, store.Slug))
                .FirstOrDefaultAsync(ct);

            if (storeSlug is null)
            {
                throw new NotFoundException("Store doesn't exist");
            }

            return storeSlug;

        })
        .WithTags("StoreFront");
    }
}