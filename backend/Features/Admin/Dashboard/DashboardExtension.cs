using backend.Features.Admin.Dashboard.GetDashboardSummary;

namespace backend.Features.Admin.Dashboard;

public static class DashboardExtension
{
    public static IEndpointRouteBuilder MapDashboardFeatures(this IEndpointRouteBuilder app)
    {
        var dashboardGroup = app.MapGroup("");

        dashboardGroup.MapGetDashboardSummary();

        dashboardGroup.RequireCors("_myAllowSpecificOrigins");

        return app;
    }
}