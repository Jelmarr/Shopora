using backend.Features.Admin.Products.Enums;

namespace backend.Features.Admin.Products.CreateProduct;

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
    public bool IsTrackInventory { get; init; }
    public ProductStatus Status { get; init; }

    public IFormFileCollection Images { get; init; } = new FormFileCollection();

    public string? ProductOptions { get; init; }
    public string? ProductVariants { get; init; }
}

public class OptionJsonDto
{
    public string Name { get; set; } = string.Empty;
    public List<ValueJsonDto> Values { get; set; } = [];
}

public class ValueJsonDto
{
    public string Value { get; set; } = string.Empty;
}

public class VariantJsonDto
{
    public string? SKU { get; set; }
    public decimal? PriceOverride { get; set; }
    public int? Stock { get; set; }
    public List<VariantOptionValueLinkDto> VariantOptionValues { get; set; } = [];
}

public class VariantOptionValueLinkDto
{
    public string OptionName { get; set; } = string.Empty;
    public string ValueText { get; set; } = string.Empty;
}