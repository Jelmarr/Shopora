using System.Security.Claims;

namespace backend.Features.Admin.Orders.GetOrders;

public static class GetOrders
{
    public static void MapGetOrders(this IEndpointRouteBuilder app)
    {
        app.MapGet("/api/orders", async (
             ClaimsPrincipal user,
             [AsParameters] GetOrdersQuery query,
             GetOrdersHandler handler,
             CancellationToken ct
         ) =>
         {

             var result = await handler.Handle(user, query, ct);

             return Results.Ok(result);

         })
         .RequireAuthorization()
         .WithTags("Orders");
    }
}