using backend.Features.Admin.Categories.Models;

namespace backend.Features.Admin.Categories.GetCategories;

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