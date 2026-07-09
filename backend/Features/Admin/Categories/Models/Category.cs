using backend.Features.Admin.Products.Models;
using backend.Features.Admin.Stores.Models;

namespace backend.Features.Admin.Categories.Models;

public class Category
{
    public Guid Id { get; set; }
    public Guid StoreId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; } = string.Empty;
    public Guid? ParentCategoryId { get; set; }
    public CategoryStatus Status { get; set; } = CategoryStatus.Active;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime? DeletedAt { get; set; }

    public Store Store { get; set; } = null!;
    public Category? ParentCategory { get; set; }
    public ICollection<Category> Subcategories { get; set; } = new List<Category>();
    public ICollection<Product> Products { get; set; } = new List<Product>();
}

public enum CategoryStatus
{
    Active,
    Inactive
}