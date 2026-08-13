public record CreateCheckoutSessionRequest
{
    public Guid StoreId { get; set; }
    public List<CheckoutItem> Items { get; set; } = [];
    public string StoreUrl { get; set; } = string.Empty;
}

public record CheckoutItem
{
    public Guid ProductId { get; set; }
    public string Name { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public int Quantity { get; set; }
}