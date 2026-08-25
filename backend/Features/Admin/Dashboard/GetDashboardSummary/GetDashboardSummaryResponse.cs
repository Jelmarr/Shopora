using backend.Core.Entities;

namespace backend.Features.Admin.Dashboard.GetDashboardSummary;

public record GetDashboardSummaryQuery
{
    public string? Range { get; set; }
}

public record GetDashboardSummaryResponse
{
    public decimal TotalRevenue { get; set; }
    public decimal RevenueChangePercent { get; set; }
    public int TotalOrders { get; set; }
    public decimal OrdersChangePercent { get; set; }
    public int TotalCustomers { get; set; }
    public decimal AverageOrderValue { get; set; }
    public List<RevenuePointDto> RevenueOverTime { get; set; } = [];
    public List<RecentOrderTableDto> RecentOrders { get; set; } = [];
}

public record RecentOrderTableDto
{
    public Guid Id { get; set; }
    public decimal Total { get; set; }
    public string CustomerEmail { get; set; } = string.Empty;
    public OrderStatus Status { get; set; }
    public DateTime? PaidAt { get; set; }
}

public record RevenuePointDto
{
    public DateTime Date { get; set; }
    public decimal Revenue { get; set; }
    public int OrderCount { get; set; }
}