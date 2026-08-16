using System.Security.Claims;
using backend.Core.Entities;
using backend.Core.Extensions;
using backend.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Features.Admin.Dashboard.GetDashboardSummary;

public class GetDashboardSummaryHandler
{
    private readonly AppDbContext _db;

    public GetDashboardSummaryHandler(AppDbContext db)
    {
        _db = db;
    }

    public async Task<GetDashboardSummaryResponse> Handle(
        ClaimsPrincipal user,
        GetDashboardSummaryQuery query,
        CancellationToken ct
    )
    {

        var storeId = user.GetStoreId();

        var days = query.Range?.ToLower() switch
        {
            "7d" => 7,
            "30d" => 30,
            "90d" => 90,
            "360d" => 360,

            _ => 30
        };

        var periodStart = DateTime.UtcNow.AddDays(-days);
        var previousPeriodStart = periodStart.AddDays(-days);

        var paidOrders = _db.Orders
            .AsNoTracking()
            .Where(order => order.StoreId == storeId && order.Status == OrderStatus.Paid);

        var currentPeriodOrders = await paidOrders
            .Where(order => order.PaidAt >= periodStart)
            .Select(order => new { order.Total, order.CustomerEmail, order.PaidAt })
            .ToListAsync(ct);

        var previousPeriodOrders = await paidOrders
            .Where(order => order.PaidAt >= previousPeriodStart && order.PaidAt < periodStart)
            .Select(order => new { order.Total })
            .ToListAsync(ct);

        var totalRevenue = currentPeriodOrders.Sum(order => order.Total);
        var previousRevenue = previousPeriodOrders.Sum(order => order.Total);

        var totalOrders = currentPeriodOrders.Count();
        var previousOrders = previousPeriodOrders.Count();

        var totalCustomers = currentPeriodOrders
            .Select(o => o.CustomerEmail)
            .Distinct()
            .Count();

        var averageOrderValue = totalOrders == 0 ? 0 : totalRevenue / totalOrders;

        var revenueOverTime = currentPeriodOrders
            .Where(o => o.PaidAt.HasValue)
            .GroupBy(o => o.PaidAt!.Value.Date)
            .Select(g => new RevenuePointDto
            {
                Date = g.Key,
                Revenue = g.Sum(o => o.Total),
                OrderCount = g.Count()
            })
            .OrderBy(p => p.Date)
            .ToList();

        return new GetDashboardSummaryResponse
        {
            TotalRevenue = totalRevenue,
            RevenueChangePercent = CalculatePercentChange(previousRevenue, totalRevenue),
            TotalOrders = totalOrders,
            OrdersChangePercent = CalculatePercentChange(previousOrders, totalOrders),
            TotalCustomers = totalCustomers,
            AverageOrderValue = averageOrderValue,
            RevenueOverTime = revenueOverTime
        };
    }

    private static decimal CalculatePercentChange(decimal previous, decimal current)
    {
        if (previous == 0) return current == 0 ? 0 : 100;
        return Math.Round(((current - previous) / previous) * 100, 1);
    }
}