using backend.Features.Products.Enums;

namespace backend.Features.Products.CreateProduct;

public record CreateProductRequest
{
    public string Name { get; init; } = string.Empty;
    public string? SKU { get; init; }
    public Guid CategoryId { get; init; }
    public string Description { get; init; } = string.Empty;
    public decimal Price { get; init; }
    public decimal? CompareAtPrice { get; init; }
    public decimal? CostPrice { get; init; }
    public int? Stock { get; init; }
    public int? LowStockThreshold { get; init; }
    public bool IsFeatured { get; init; }
    public ProductStatus Status { get; init; }

    public IFormFileCollection Images { get; init; } = new FormFileCollection();
}