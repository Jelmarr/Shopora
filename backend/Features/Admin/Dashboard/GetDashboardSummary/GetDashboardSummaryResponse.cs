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
}

public record RevenuePointDto
{
    public DateTime Date { get; set; }
    public decimal Revenue { get; set; }
    public int OrderCount { get; set; }
}