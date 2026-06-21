using backend.Features.Categories.Models;
using backend.Features.Products.Models;

namespace backend.Features.Stores.Models;

public class Store
{
    public Guid StoreId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string LogoUrl { get; set; } = string.Empty;
    public string LogoPublicId { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<Product> Products { get; set; } = new List<Product>();
    public ICollection<Category> Categories { get; set; } = new List<Category>();
}