using backend.Core.Entities;

namespace backend.Features.Admin.Orders.GetOrders;

public record GetOrdersResponse
{
    public Guid Id { get; init; }
    public string CustomerEmail { get; init; } = string.Empty;
    public string CustomerName { get; init; } = string.Empty;
    public string ShippingAddress { get; init; } = string.Empty;
    public decimal Total { get; init; }
    public OrderStatus Status { get; init; }
    public DateTime? PaidAt { get; init; }
}

public record GetOrdersQuery
{
    public string? Search { get; set; }
    public OrderStatus? Status { get; set; }
    public string? SortBy { get; set; }
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 10;
}

public record PageOrdersResponse
{
    public List<GetOrdersResponse> Orders { get; set; } = [];
    public int TotalCount { get; set; }
    public int CurrentPage { get; set; }
    public int TotalPages { get; set; }
}