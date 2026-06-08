using backend.Features.Products.Enums;
using Microsoft.AspNetCore.Mvc;

namespace backend.Features.Products.GetProducts;

public record GetProductResponse
{
    public Guid Id { get; init; }
    public string Name { get; init; } = string.Empty;
    public string SKU { get; init; } = string.Empty;
    public string CategoryName { get; init; } = string.Empty;
    public string Description { get; init; } = string.Empty;
    public decimal Price { get; init; }
    public decimal? CompareAtPrice { get; init; }
    public int Stock { get; init; }
    public int LowStockThreshold { get; init; }
    public bool IsFeatured { get; init; }
    public ProductStatus Status { get; init; }
    public List<string> Images { get; init; } = new();
}