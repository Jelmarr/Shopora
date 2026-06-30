using backend.Features.Products.Enums;

namespace backend.Features.Products.GetProducts;

public record GetProductsResponse
{
    public Guid Id { get; init; }
    public string Name { get; init; } = string.Empty;
    public Guid CategoryId { get; init; }
    public string CategoryName { get; init; } = string.Empty;
    public int Stock { get; init; }
    public bool IsFeatured { get; init; }
    public bool IsTrackInventory { get; set; }
    public ProductStatus Status { get; init; }
    public List<string> Images { get; init; } = new();
    public DateTime CreatedAt { get; set; }
}

public record GetProductsFilter(
    string? Search = null,
    string? Category = null,
    string? Status = null,
    string? SortBy = null,
    string? SortOrder = null
);

public record GetProductsPagination(
    int Page = 1,
    int PageSize = 25
);

public record PageProductsRespose(
    List<GetProductsResponse> Products,
    int TotalCount,
    int CurrentPage,
    int TotalPages
);