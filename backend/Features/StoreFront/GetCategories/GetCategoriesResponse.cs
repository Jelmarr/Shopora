namespace backend.Features.StoreFront.GetCategories;

public record GetCategoriesResponse
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
}