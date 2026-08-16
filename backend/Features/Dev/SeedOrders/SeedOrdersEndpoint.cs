using backend.Core.Entities;
using backend.Data;

namespace backend.Features.Dev.SeedOrders;

public static class SeedOrdersEndpoint
{
    public static void MapSeedOrders(this IEndpointRouteBuilder app)
    {
        app.MapPost("/api/dev/seed-orders/{storeId}", async (
            Guid storeId,
            AppDbContext db,
            CancellationToken ct
        ) =>
        {
            var random = new Random();
            var statuses = new[] { OrderStatus.Paid, OrderStatus.Paid, OrderStatus.Paid, OrderStatus.Paid, OrderStatus.Paid };
            var names = new[] { "Amara Chen", "Devon Marsh", "Priya Nair", "Marcus Webb", "Lena Ortiz" };

            var orders = new List<Order>();

            for (var i = 0; i < 60; i++)
            {
                var daysAgo = random.Next(0, 90);
                var createdAt = DateTime.UtcNow.AddDays(-daysAgo).AddHours(-random.Next(0, 24));
                var status = statuses[random.Next(statuses.Length)];
                var total = Math.Round((decimal)(random.NextDouble() * 180 + 20), 2);
                var name = names[random.Next(names.Length)];

                orders.Add(new Order
                {
                    Id = Guid.NewGuid(),
                    StoreId = storeId,
                    CustomerName = name,
                    CustomerEmail = $"{name.ToLower().Replace(" ", ".")}@example.com",
                    ShippingAddress = "123 Sample St",
                    ShippingCity = "Manila",
                    ShippingPostalCode = "1000",
                    ShippingCountry = "PH",
                    Subtotal = total,
                    ShippingFee = 0,
                    Total = total,
                    Status = status,
                    StripeSessionId = $"cs_test_seed_{Guid.NewGuid():N}",
                    CreatedAt = createdAt,
                    PaidAt = status == OrderStatus.Paid ? createdAt : null
                });
            }

            db.Orders.AddRange(orders);
            await db.SaveChangesAsync(ct);

            return Results.Ok(new { seeded = orders.Count });
        })
        .WithTags("Dev");
    }
}