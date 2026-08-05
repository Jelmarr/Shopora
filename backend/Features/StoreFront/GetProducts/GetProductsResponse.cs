using Microsoft.AspNetCore.Mvc;

namespace backend.Features.StoreFront.GetProducts;

public record GetProductResponse
{
    public Guid Id { get; init; }
    public string Name { get; init; } = string.Empty;
    public Guid CategoryId { get; init; }
    public string CategoryName { get; init; } = string.Empty;
    public decimal Price { get; init; }
    public decimal? ComparePrice { get; init; }
    public int Stock { get; init; }
    public bool IsFeatured { get; init; }
    public List<string> Images { get; init; } = new List<string>();
}

public record GetProductsQuery
(
    string? Search = null,
    string? SortBy = null,
    [FromQuery(Name = "categories")] string[]? Categories = null,
    decimal? MinPrice = null,
    decimal? MaxPrice = null,

    int Page = 1,
    int PageSize = 16
);

public record PageProductsResponse
(
     List<GetProductResponse> Products,
     int TotalCount,
     int CurrentPage,
     int TotalPages
);