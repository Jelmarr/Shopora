namespace backend.Features.StoreFront.GetRelatedProducts;

public record GetRelatedProductsResponse
{
    public Guid Id { get; init; }
    public string Name { get; init; } = string.Empty;
    public Guid CategoryId { get; init; }
    public string CategoryName { get; init; } = string.Empty;
    public decimal Price { get; init; }
    public decimal? ComparePrice { get; init; }
    public List<string> Images { get; init; } = new List<string>();
}