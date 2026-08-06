using Microsoft.AspNetCore.Mvc;

namespace backend.Features.StoreFront.GetRelatedProducts;

public static class GetRelatedProducts
{

    public static void MapGetRelatedProducts(this IEndpointRouteBuilder app)
    {
        app.MapGet("/api/store/products/related/{storeId:guid}", async (
            Guid storeId,
            [FromQuery] Guid currentProductId,
            [FromQuery] Guid categoryId,
            GetRelatedProductsHandler handler,
            CancellationToken ct
        ) =>
        {

            var result = await handler.Handle(storeId, currentProductId, categoryId, ct);

            return Results.Ok(result);

        })
        .WithTags("StoreFront");
    }

}