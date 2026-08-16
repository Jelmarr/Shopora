using System.Security.Claims;

namespace backend.Features.Admin.Dashboard.GetDashboardSummary;

public static class GetDashboardSummary
{
    public static void MapGetDashboardSummary(this IEndpointRouteBuilder app)
    {

        app.MapGet("/api/dashboard/summary", async (
          ClaimsPrincipal user,
          [AsParameters] GetDashboardSummaryQuery query,
          GetDashboardSummaryHandler handler,
          CancellationToken ct
      ) =>
      {
          var result = await handler.Handle(user, query, ct);
          return Results.Ok(result);
      })
      .RequireAuthorization()
      .WithTags("Dashboard");
    }
}