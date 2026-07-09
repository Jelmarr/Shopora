using System.Security.Claims;

namespace backend.Features.Admin.Products.DeleteProduct;

public static class DeleteProduct
{
    public static void MapDeleteProduct(this IEndpointRouteBuilder app)
    {
        app.MapDelete("/api/products/{id:guid}", async (
            Guid Id,
            ClaimsPrincipal user,
            DeleteProductHandler handler,
            CancellationToken ct
        ) =>
        {

            var response = await handler.Handle(user, Id, ct);
            return Results.Ok(response);

        })
        .RequireAuthorization()
        .WithTags("Product");
    }
}