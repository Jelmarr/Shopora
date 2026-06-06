using backend.Features.Products.Models;

namespace backend.Features.Products.ProductImages;

public class ProductImage
{
    public Guid Id { get; set; }
    public Guid ProductId { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
    public bool IsPrimary { get; set; }

    public Product Product { get; set; } = null!;
}