using backend.Features.Categories.Models;

namespace backend.Features.Categories.GetCategories;

public record GetCategoriesResponse
{
    public Guid Id { get; init; }
    public string Name { get; init; } = string.Empty;
    public string? Description { get; init; } = string.Empty;
    public CategoryStatus Status { get; init; }
    public Guid? ParentCategoryId { get; init; }
    public string? ParentCategoryName { get; init; } = string.Empty;
    public int ProductCount { get; init; }
}