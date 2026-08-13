namespace backend.Features.StoreFront.Checkout.CreateCheckoutSession;

public static class CreateCheckoutSessionEndpoint
{
    public static void MapCreateCheckoutSession(this IEndpointRouteBuilder app)
    {
        app.MapPost("/api/checkout/session", async (
            CreateCheckoutSessionRequest request,
            CreateCheckoutSessionHandler handler,
            CancellationToken ct
        ) =>
        {
            var url = await handler.Handle(request, ct);
            return Results.Ok(new { url });
        })
        .WithTags("Checkout");
    }
}