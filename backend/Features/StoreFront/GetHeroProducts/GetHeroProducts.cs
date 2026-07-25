namespace backend.Features.StoreFront.GetHeroProducts;

public static class GetHeroProducts
{
    public static void MapGetHeroProducts(this IEndpointRouteBuilder app)
    {
        app.MapGet("/api/store/latestProducts/{storeId}", async (
            Guid storeId,
            GetHeroProductsHandler handler,
            CancellationToken ct
        ) =>
        {

            var result = await handler.Handle(storeId, ct);
            return Results.Ok(result);

        })
        .WithTags("StoreFront");
    }
}