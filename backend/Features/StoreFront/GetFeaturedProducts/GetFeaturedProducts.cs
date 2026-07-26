
namespace backend.Features.StoreFront.GetFeaturedProducts;

public static class GetFeaturedProducts
{
    public static void MapGetFeaturedProducts(this IEndpointRouteBuilder app)
    {
        app.MapGet("/api/store/featuredProducts/{storeId}", async (
            Guid storeId,
            GetFeaturedProductsHandler handler,
            CancellationToken ct
        ) =>
        {

            var results = await handler.Handle(storeId, ct);

            return Results.Ok(results);
        })
        .WithTags("StoreFront");
    }
}