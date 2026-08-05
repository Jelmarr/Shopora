namespace backend.Features.StoreFront.GetProductById;

public static class GetProductById
{
    public static void MapGetProductById(this IEndpointRouteBuilder app)
    {
        app.MapGet("/api/store/products/{id:guid}/{storeId:guid}", async (
            Guid id,
            GetProductByIdHandler handler,
            Guid storeId,
            CancellationToken ct) =>
        {

            var result = await handler.Handle(id, storeId, ct);

            return Results.Ok(result);

        })
        .WithTags("StoreFront");
    }
}