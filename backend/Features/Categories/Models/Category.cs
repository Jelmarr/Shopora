using backend.Features.Products.Models;
using backend.Features.Stores.Models;

namespace backend.Features.Categories.Models;

public class Category
{
    public Guid CategoryId { get; set; }
    public Guid StoreId { get; set; }
    public string Name { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public Store Store { get; set; } = null!;

    public ICollection<Product> Products { get; set; } = new List<Product>();
}