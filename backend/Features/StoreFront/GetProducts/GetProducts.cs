namespace backend.Features.StoreFront.GetProducts;

public static class GetProducts
{
    public static void MapGetProducts(this IEndpointRouteBuilder app)
    {
        app.MapGet("/api/store/products/{storeId}", async (
            Guid storeId,
            GetProductHandler handler,
            [AsParameters] GetProductsFilter filters,
            CancellationToken ct
        ) =>
        {

            var result = await handler.Handle(storeId, filters, ct);

            return Results.Ok(result);
        })
        .WithTags("StoreFront");
    }
}