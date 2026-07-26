namespace backend.Features.StoreFront.GetFeaturedProducts;

public record GetFeaturedProductsResponse
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string? PrimaryImageUrl { get; set; } = string.Empty;
    public bool IsFeatured { get; set; }
    public decimal Price { get; set; }
    public decimal? ComparePrice { get; set; }
    public int Stock { get; set; }
    public DateTime CreatedAt { get; set; }
}