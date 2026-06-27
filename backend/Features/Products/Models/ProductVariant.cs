using backend.Features.Stores.Models;

namespace backend.Features.Products.Models;

public class ProductVariant
{
    public Guid Id { get; set; }
    public Guid ProductId { get; set; }
    public Guid StoreId { get; set; }
    public string? SKU { get; set; } = string.Empty;
    public decimal? PriceOverride { get; set; }
    public int? Stock { get; set; }

    public Product Product { get; set; } = null!;
    public Store Store { get; set; } = null!;
    public ICollection<ProductVariantOption> Options { get; set; } = new List<ProductVariantOption>();
}