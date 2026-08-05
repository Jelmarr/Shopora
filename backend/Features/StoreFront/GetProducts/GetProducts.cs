namespace backend.Features.StoreFront.GetProducts;

public static class GetProducts
{
    public static void MapGetProducts(this IEndpointRouteBuilder app)
    {
        app.MapGet("/api/store/products/{storeId:guid}", async (
            Guid storeId,
            GetProductHandler handler,
            [AsParameters] GetProductsQuery query,
            CancellationToken ct
        ) =>
        {

            var result = await handler.Handle(storeId, query, ct);

            return Results.Ok(result);
        })
        .WithTags("StoreFront");
    }
}