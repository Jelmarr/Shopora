namespace backend.Features.StoreFront.GetCategories;

public static class GetCategories
{
    public static void MapGetCategories(this IEndpointRouteBuilder app)
    {
        app.MapGet("/api/store/categories/{storeId}", async (
            Guid storeId,
            GetCategoriesHandler handler,
            CancellationToken ct
        ) =>
        {

            var results = await handler.Handle(storeId, ct);

            return Results.Ok(results);

        })
        .WithTags("StoreFront");
    }
}