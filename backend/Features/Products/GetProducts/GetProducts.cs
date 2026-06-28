using System.Security.Claims;

namespace backend.Features.Products.GetProducts;

public static class GetProducts
{
    public static void MapGetProducts(this IEndpointRouteBuilder app)
    {
        app.MapGet("/api/products", async (
            ClaimsPrincipal user,
            [AsParameters] GetProductsFilter filters,
            [AsParameters] GetProductsPagination pagination,
            GetProductsHandler handler,
            CancellationToken ct
        ) =>
        {

            var products = await handler.Handle(user, filters, pagination, ct);

            return Results.Ok(new { products });

        })
        .RequireAuthorization()
        .WithTags("Product");
    }
}