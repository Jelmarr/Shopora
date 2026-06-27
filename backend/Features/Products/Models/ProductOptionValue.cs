namespace backend.Features.Products.Models;

public class ProductOptionValue
{
    public Guid Id { get; set; }
    public Guid ProductOptionId { get; set; }
    public string Value { get; set; } = string.Empty;

    public ProductOption ProductOption { get; set; } = null!;
    public ICollection<ProductVariantOption> VariantOptions { get; set; } = new List<ProductVariantOption>();
}