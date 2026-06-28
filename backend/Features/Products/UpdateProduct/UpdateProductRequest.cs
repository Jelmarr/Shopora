using backend.Features.Products.Enums;
using Microsoft.AspNetCore.Mvc;

namespace backend.Features.Products.UpdateProduct;

public record UpdateProductRequest
{
    public Guid Id { get; init; }
    public Guid StoreId { get; init; }
    public Guid CategoryId { get; init; }
    public string Name { get; init; } = string.Empty;
    public string SKU { get; init; } = string.Empty;
    public string Description { get; init; } = string.Empty;
    public decimal Price { get; init; }
    public decimal? CompareAtPrice { get; init; }
    public decimal? CostPrice { get; init; }
    public int Stock { get; init; }
    public int LowStockThreshold { get; init; }
    public bool IsFeatured { get; init; }
    public bool IsTrackInventory { get; init; }
    public ProductStatus Status { get; init; }

    [FromForm(Name = "images")]
    public IFormFileCollection Images { get; init; } = new FormFileCollection();

    public string? ProductOptions { get; init; }
    public string? ProductVariants { get; init; }
}