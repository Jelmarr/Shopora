using System.Security.Claims;
using backend.Core.Extensions;
using backend.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Features.Products.GetProducts;

public static class GetProducts
{
    public static void MapGetProducts(this IEndpointRouteBuilder app)
    {
        app.MapGet("/api/products", async (
            ClaimsPrincipal user,
            AppDbContext db,
            CancellationToken ct
        ) =>
        {

            var storeId = user.GetStoreId();

            var products = await db.Products
                .AsNoTracking()
                .Include(product => product.Category)
                .Where(product => product.StoreId == storeId && !product.IsDeleted)
                .Select(product => new GetProductResponse
                {
                    Id = product.Id,
                    CategoryName = product.Category != null ? product.Category.Name : "Uncategorized",
                    Name = product.Name,
                    Description = product.Description,
                    SKU = product.SKU,
                    Price = product.Price,
                    CompareAtPrice = product.CompareAtPrice,
                    Stock = product.Stock,
                    LowStockThreshold = product.LowStockThreshold,
                    IsFeatured = product.IsFeatured,
                    Status = product.Status,
                    Images = product.Images.Select(img => img.ImageUrl).ToList()
                })
                .ToListAsync(ct);

            return Results.Ok(products);

        })
        .RequireAuthorization()
        .WithTags("Product");
    }
}