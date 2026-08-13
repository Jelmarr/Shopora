using backend.Features.Admin.Products.Models;

namespace backend.Core.Entities;

public class OrderItem
{
    public Guid Id { get; set; }

    public Guid OrderId { get; set; }
    public Order Order { get; set; } = null!;

    public Guid ProductId { get; set; }
    public Product Product { get; set; } = null!;

    public Guid? ProductVariantId { get; set; }
    public ProductVariant? ProductVariant { get; set; }

    // Snapshot fields — critical, see note below
    public string ProductName { get; set; } = string.Empty;
    public decimal UnitPrice { get; set; }
    public int Quantity { get; set; }

    public decimal LineTotal => UnitPrice * Quantity;
}