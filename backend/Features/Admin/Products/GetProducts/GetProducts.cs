using System.Security.Claims;

namespace backend.Features.Admin.Products.GetProducts;

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

            var result = await handler.Handle(user, filters, pagination, ct);

            return Results.Ok(result);

        })
        .RequireAuthorization()
        .WithTags("Product");
    }
}