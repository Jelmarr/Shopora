using System.Security.Claims;
using backend.Core.Extensions;
using backend.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Features.Admin.Orders.GetOrders;

public class GetOrdersHandler
{
    private readonly AppDbContext _db;

    public GetOrdersHandler(AppDbContext db)
    {
        _db = db;
    }

    public async Task<PageOrdersResponse> Handle(
        ClaimsPrincipal user,
        GetOrdersQuery query,
        CancellationToken ct
    )
    {

        var storeId = user.GetStoreId();

        var queryOrder = _db.Orders
            .AsNoTracking()
            .Where(order => order.StoreId == storeId);

        if (!string.IsNullOrEmpty(query.Search))
        {
            var normalizedSearch = query.Search.Trim();

            queryOrder = queryOrder.Where(o =>
                EF.Functions.ILike(o.CustomerEmail, $"%{normalizedSearch}%") ||
                EF.Functions.ILike(o.CustomerName, $"%{normalizedSearch}%")
            );
        }

        if (query.Status.HasValue)
        {
            queryOrder = queryOrder.Where(o => o.Status == query.Status.Value);
        }

        queryOrder = query.SortBy?.ToLower() switch
        {
            "newest" => queryOrder.OrderByDescending(order => order.CreatedAt),

            "oldest" => queryOrder.OrderBy(order => order.CreatedAt),

            "total-high" => queryOrder.OrderByDescending(order => order.Total),

            "total-low" => queryOrder.OrderBy(order => order.Total),

            _ => queryOrder.OrderByDescending(order => order.CreatedAt)
        };

        var totalCount = await queryOrder.CountAsync(ct);

        var orders = await queryOrder
            .Skip((query.Page - 1) * query.PageSize)
            .Take(query.PageSize)
            .Select(order => new GetOrdersResponse
            {
                Id = order.Id,
                CustomerEmail = order.CustomerEmail,
                ShippingAddress = order.ShippingAddress,
                Total = order.Total,
                PaidAt = order.PaidAt,
                Status = order.Status
            })
            .ToListAsync(ct);

        var totalPages = totalCount == 0 ? 1 : (int)Math.Ceiling(totalCount / (double)query.PageSize);

        return new PageOrdersResponse
        {
            Orders = orders,
            TotalCount = totalCount,
            CurrentPage = query.Page,
            TotalPages = totalPages
        };

    }
}