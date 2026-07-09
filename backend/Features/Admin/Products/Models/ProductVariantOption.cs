namespace backend.Features.Admin.Products.Models;

public class ProductVariantOption
{
    public Guid ProductVariantId { get; set; }
    public Guid ProductOptionValueId { get; set; }

    public ProductVariant ProductVariant { get; set; } = null!;

    public ProductOptionValue ProductOptionValue { get; set; } = null!;
}