using backend.Features.Admin.Orders.GetOrders;

namespace backend.Features.Admin.Orders;

public static class OrdersExtension
{
    public static IEndpointRouteBuilder MapOrdersFeatures(this IEndpointRouteBuilder app)
    {
        var orderGroup = app.MapGroup("");

        orderGroup.MapGetOrders();

        orderGroup.RequireCors("_myAllowSpecificOrigins");

        return app;
    }
}