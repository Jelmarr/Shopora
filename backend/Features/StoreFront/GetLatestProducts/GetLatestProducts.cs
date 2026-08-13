namespace backend.Features.StoreFront.GetLatestProducts;

public static class GetLatestProducts
{
    public static void MapGetLatestProducts(this IEndpointRouteBuilder app)
    {
        app.MapGet("/api/store/latestProducts/{storeId}", async (
            Guid storeId,
            GetLatestProductsHandler handler,
            CancellationToken ct
        ) =>
        {

            var result = await handler.Handle(storeId, ct);
            return Results.Ok(result);

        })
        .WithTags("StoreFront");
    }
}