using Stripe;
using Stripe.Checkout;

namespace backend.Features.StoreFront.Webhooks.StripeWebhook;

public static class StripeWebhookEndpoint
{
    public static void MapStripeWebhook(this IEndpointRouteBuilder app)
    {
        app.MapPost("/api/webhooks/stripe", async (
            HttpRequest request,
            IConfiguration config,
            ILogger<Program> logger,
            StripeWebhookHandler handler,
            CancellationToken ct
        ) =>
        {
            var json = await new StreamReader(request.Body).ReadToEndAsync(ct);

            Event stripeEvent;

            try
            {
                stripeEvent = EventUtility.ConstructEvent(
                    json,
                    request.Headers["Stripe-Signature"],
                    config["Stripe:WebhookSecret"]
                );
            }
            catch (StripeException ex)
            {
                logger.LogWarning(ex, "Stripe webhook signature verification failed");
                return Results.BadRequest();
            }

            if (stripeEvent.Type == "checkout.session.completed")
            {
                var session = stripeEvent.Data.Object as Session;

                if (session is null)
                {
                    return Results.BadRequest();
                }

                await handler.Handle(session, logger, ct);
            }

            return Results.Ok();
        })
        .WithTags("Webhooks");
    }
}