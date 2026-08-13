using System.Text.Json;
using backend.Core.Entities;
using backend.Data;
using Microsoft.EntityFrameworkCore;
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
            AppDbContext db,
            ILogger<Program> logger,
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

                await CreateOrderFromSession(session, db, logger, ct);
            }

            return Results.Ok();
        })
        .WithTags("Webhooks");
    }

    private static async Task CreateOrderFromSession(
     Session session,
     AppDbContext db,
     ILogger logger,
     CancellationToken ct)
    {
        var existingOrder = await db.Orders
            .FirstOrDefaultAsync(o => o.StripeSessionId == session.Id, ct);

        if (existingOrder is not null)
        {
            logger.LogInformation("Order already exists for session {SessionId}, skipping", session.Id);
            return;
        }

        var storeId = Guid.Parse(session.Metadata["storeId"]);
        var cartItems = JsonSerializer.Deserialize<List<CartItemSnapshot>>(session.Metadata["cart"])
            ?? [];

        var lineItemService = new SessionLineItemService();
        var lineItems = await lineItemService.ListAsync(
            session.Id,
            new SessionLineItemListOptions { Limit = 100 },
            cancellationToken: ct
        );

        var order = new Order
        {
            Id = Guid.NewGuid(),
            StoreId = storeId,
            CustomerEmail = session.CustomerDetails?.Email ?? string.Empty,
            CustomerName = session.CustomerDetails?.Name ?? string.Empty,
            ShippingAddress = session.CustomerDetails?.Address?.Line1 ?? string.Empty,
            ShippingCity = session.CustomerDetails?.Address?.City ?? string.Empty,
            ShippingPostalCode = session.CustomerDetails?.Address?.PostalCode ?? string.Empty,
            ShippingCountry = session.CustomerDetails?.Address?.Country ?? string.Empty,
            Subtotal = (session.AmountSubtotal ?? 0) / 100m,
            ShippingFee = 0,
            Total = (session.AmountTotal ?? 0) / 100m,
            Status = OrderStatus.Paid,
            StripeSessionId = session.Id,
            StripePaymentIntentId = session.PaymentIntentId,
            PaidAt = DateTime.UtcNow,
            Items = []
        };

        // Match Stripe's line items (name/price/qty) to our cart snapshot (productId) by index —
        // both arrays are built from the same request.Items order, so positions align.
        var lineItemsList = lineItems.Data;

        for (var i = 0; i < lineItemsList.Count && i < cartItems.Count; i++)
        {
            var lineItem = lineItemsList[i];
            var cartItem = cartItems[i];

            var product = await db.Products.FindAsync([cartItem.ProductId], ct);

            if (product is null)
            {
                logger.LogWarning("Product {ProductId} not found while creating order item", cartItem.ProductId);
                continue;
            }

            var quantity = lineItem.Quantity > 0 ? lineItem.Quantity : 1;
            decimal? rawUnitPrice = lineItem.AmountTotal / 100m / quantity;

            order.Items.Add(new OrderItem
            {
                Id = Guid.NewGuid(),
                ProductId = product.Id,
                ProductName = lineItem.Description ?? product.Name,
                UnitPrice = rawUnitPrice ?? 0m,
                Quantity = (int)quantity
            });

            product.Stock -= (int)quantity;
            if (product.Stock < 0) product.Stock = 0;
        }

        db.Orders.Add(order);
        await db.SaveChangesAsync(ct);

        logger.LogInformation("Order {OrderId} created for session {SessionId}", order.Id, session.Id);
    }

    private record CartItemSnapshot
    {
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
    }

}