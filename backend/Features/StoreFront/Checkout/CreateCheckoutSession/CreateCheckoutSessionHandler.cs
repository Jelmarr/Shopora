using System.Text.Json;
using Stripe;
using Stripe.Checkout;

namespace backend.Features.StoreFront.Checkout.CreateCheckoutSession;

public class CreateCheckoutSessionHandler
{
    private readonly IConfiguration _config;

    public CreateCheckoutSessionHandler(IConfiguration config)
    {
        _config = config;
    }

    public async Task<string> Handle(CreateCheckoutSessionRequest request, CancellationToken ct)
    {
        StripeConfiguration.ApiKey = _config["Stripe:SecretKey"];

        var lineItems = request.Items.Select(item => new SessionLineItemOptions
        {
            PriceData = new SessionLineItemPriceDataOptions
            {
                Currency = "php",
                UnitAmount = (long)(item.Price * 100),
                ProductData = new SessionLineItemPriceDataProductDataOptions
                {
                    Name = item.Name,
                },
            },
            Quantity = item.Quantity,
        }).ToList();

        // Cart snapshot for the webhook — includes ProductId per item,
        // which line-item Price metadata can't reliably carry.
        var cartSnapshot = request.Items.Select(item => new
        {
            productId = item.ProductId,
            productVariantId = item.ProductVariantId,
            quantity = item.Quantity
        });

        var options = new SessionCreateOptions
        {
            LineItems = lineItems,
            Mode = "payment",
            ShippingAddressCollection = new SessionShippingAddressCollectionOptions
            {
                AllowedCountries = new List<string> { "PH", "US" }
            },
            PhoneNumberCollection = new SessionPhoneNumberCollectionOptions
            {
                Enabled = true
            },
            SuccessUrl = $"{request.StoreUrl}/checkout/success?session_id={{CHECKOUT_SESSION_ID}}",
            CancelUrl = $"{request.StoreUrl}/checkout/cancel",
            Metadata = new Dictionary<string, string>
            {
                { "storeId", request.StoreId.ToString() },
                { "cart", JsonSerializer.Serialize(cartSnapshot) }
            }
        };

        var service = new SessionService();
        var session = await service.CreateAsync(options, cancellationToken: ct);

        return session.Url;
    }
}