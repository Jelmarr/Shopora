namespace backend.Features.StoreFront.GetProducts;

public record GetProductResponse
{
    public Guid Id { get; init; }
    public string Name { get; init; } = string.Empty;
    public Guid CategoryId { get; init; }
    public string CategoryName { get; init; } = string.Empty;
    public int Stock { get; init; }
    public bool IsFeatured { get; init; }
    public List<string> Images { get; init; } = new List<string>();

}