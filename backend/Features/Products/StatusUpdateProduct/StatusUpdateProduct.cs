using System.Security.Claims;

namespace backend.Features.Products.StatusUpdateProduct;

public static class StatusUpdateProduct
{
    public static void MapStatusUpdateProduct(this IEndpointRouteBuilder app)
    {
        app.MapPatch("/api/product/{id:guid}/status", async (
            Guid id,
            ClaimsPrincipal user,
            StatusUpdateProductHandler handler,
            StatusUpdateProductRequest request,
            CancellationToken ct
        ) =>
        {

            var result = await handler.Handle(user, id, request, ct);
            return Results.Ok(result);
        })
        .WithTags("Product")
        .RequireAuthorization();
    }
}