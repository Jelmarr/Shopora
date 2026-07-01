using backend.Features.Products.Enums;

namespace backend.Features.Products.GetProductById;

public record GetProductByIdResponse
{
    public Guid Id { get; init; }
    public string Name { get; init; } = string.Empty;
    public Guid CategoryId { get; init; }
    public ProductStatus Status { get; init; }
    public bool IsFeatured { get; init; }
    public decimal? CostPrice { get; init; }
    public decimal? CompareAtPrice { get; init; }
    public decimal Price { get; init; }
    public bool IsTrackInventory { get; init; }
    public string? SKU { get; init; }
    public int? Stock { get; init; }
    public int? LowStockThreshold { get; init; }
    public string Description { get; init; } = string.Empty;
    public List<string> Images { get; init; } = new();
    public List<ProductOptionResponse> Options { get; init; } = new();
    public List<ProductVariantResponse> Variants { get; init; } = new();
}

public record ProductOptionResponse
{
    public Guid Id { get; init; }
    public string Name { get; init; } = string.Empty;
    public List<string> Values { get; init; } = new();
}

public record ProductVariantResponse
{
    public string SKU { get; init; } = string.Empty;
    public decimal? PriceOverride { get; init; }
    public int? Stock { get; set; }
    public List<ProductVariantOptionResponse> Options { get; init; } = new();
}

public record ProductVariantOptionResponse
{
    public string Name { get; init; } = string.Empty;
    public string Value { get; init; } = string.Empty;
}
