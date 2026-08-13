namespace backend.Features.StoreFront.GetLatestProducts;

public record GetLatestProductsResponse
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string CategoryName { get; set; } = string.Empty;
    public List<string> Images { get; set; } = new List<string>();
    public string? PrimaryImage { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public decimal? ComparePrice { get; set; }
    public int Stock { get; set; }
    public DateTime CreatedAt { get; set; }
}