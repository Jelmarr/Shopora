using System.Security.Claims;

namespace backend.Features.Products.GetProductById;

public static class GetProductById
{
    public static void MapGetProductById(this IEndpointRouteBuilder app)
    {
        app.MapGet("/api/products/{id:guid}", async (
            Guid id,
            ClaimsPrincipal user,
            GetProductByIdHandler handler,
            CancellationToken ct) =>
        {

            var result = await handler.Handle(user, id, ct);

            return Results.Ok(result);

        })
        .RequireAuthorization()
        .WithTags("Product");
    }
}