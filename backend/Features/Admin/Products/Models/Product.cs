using backend.Features.Admin.Products.Enums;
using backend.Features.Admin.Categories.Models;
using backend.Features.Admin.Stores.Models;
namespace backend.Features.Admin.Products.Models;

public class Product
{
    public Guid Id { get; set; }
    public Guid StoreId { get; set; }
    public Guid CategoryId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? SKU { get; set; }
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public decimal? CompareAtPrice { get; set; }
    public decimal? CostPrice { get; set; }
    public int Stock { get; set; }
    public int LowStockThreshold { get; set; }
    public bool IsFeatured { get; set; }
    public bool IsTrackInventory { get; set; }
    public ProductStatus Status { get; set; }

    public ICollection<ProductImage> Images { get; set; } = new List<ProductImage>();
    public ICollection<ProductOption> Options { get; set; } = new List<ProductOption>();
    public ICollection<ProductVariant> Variants { get; set; } = new List<ProductVariant>();

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime? DeletedAt { get; set; }

    // Navigations Properties
    public Category Category { get; set; } = null!;
    public Store Store { get; set; } = null!;
}