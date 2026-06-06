using backend.Features.Products.Enums;
using backend.Features.Categories.Models;
using backend.Features.Stores.Models;
using backend.Features.Products.ProductImages;

namespace backend.Features.Products.Models;

public class Product
{
    public Guid Id { get; set; }
    public Guid StoreId { get; set; }
    public Guid CategoryId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string SKU { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public decimal? CompareAtPrice { get; set; }
    public decimal? CostPrice { get; set; }
    public int Stock { get; set; }
    public int LowStockThreshold { get; set; }
    public bool TrackInventory { get; set; }
    public bool IsFeatured { get; set; }
    public ProductStatus Status { get; set; }
    public ICollection<ProductImage> Images = new List<ProductImage>();
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime? DeletedAt { get; set; }

    // Navigations Properties
    public Category Category { get; set; } = null!;
    public Store Store { get; set; } = null!;
}