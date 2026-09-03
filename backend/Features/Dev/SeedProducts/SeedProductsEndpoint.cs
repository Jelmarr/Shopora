using backend.Data;
using backend.Features.Dev.SeedProducts;
using Microsoft.EntityFrameworkCore;

namespace backend.Features.Dev.SeedShoes;

public static class SeedShoesEndpoint
{
    public static void MapSeedShoes(this IEndpointRouteBuilder app)
    {
        app.MapPost("/api/dev/seed-shoes/{storeId}/{categoryId}", async (
            Guid storeId,
            Guid categoryId,
            AppDbContext db,
            CancellationToken ct
        ) =>
        {
            var alreadySeeded = await db.Products
                .AnyAsync(p => p.StoreId == storeId && p.SKU!.StartsWith("SHOE-"), ct);

            if (alreadySeeded)
                return Results.Ok(new { seeded = 0, message = "Shoes already seeded for this store." });

            var products = ShoeProductSeeder.Seed(storeId, categoryId);

            db.Products.AddRange(products);
            await db.SaveChangesAsync(ct);

            return Results.Ok(new { seeded = products.Count });
        })
        .WithTags("Dev");
    }
}