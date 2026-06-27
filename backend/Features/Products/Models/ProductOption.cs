namespace backend.Features.Products.Models;

public class ProductOption
{
    public Guid Id { get; set; }
    public Guid ProductId { get; set; }
    public string Name { get; set; } = string.Empty;

    public Product Product { get; set; } = null!;
    public ICollection<ProductOptionValue> Values { get; set; } = new List<ProductOptionValue>();
}