using System.Security.Claims;
using backend.Core.Entities;
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

        var page = query.Page ?? 1;
        var pageSize = query.PageSize ?? 10;

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

        if (!string.IsNullOrEmpty(query.Status) &&
        Enum.TryParse<OrderStatus>(query.Status, ignoreCase: true, out var status))
        {
            queryOrder = queryOrder.Where(o => o.Status == status);
        }

        bool isDescending = query.SortOrder?.ToLower() == "desc";

        queryOrder = query.SortBy?.ToLower() switch
        {
            "date" => isDescending
                ? queryOrder.OrderByDescending(order => order.CreatedAt)
                : queryOrder.OrderBy(order => order.CreatedAt),


            "amount" => isDescending
                ? queryOrder.OrderByDescending(order => order.Total)
                : queryOrder.OrderBy(order => order.Total),

            _ => queryOrder.OrderByDescending(order => order.CreatedAt)
        };

        var totalCount = await queryOrder.CountAsync(ct);

        var orders = await queryOrder
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
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

        var totalPages = totalCount == 0 ? 1 : (int)Math.Ceiling(totalCount / (double)pageSize);

        return new PageOrdersResponse
        {
            Orders = orders,
            TotalCount = totalCount,
            CurrentPage = page,
            TotalPages = totalPages
        };

    }
}