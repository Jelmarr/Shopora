namespace backend.Features.Categories.CreateCategories;

public record CreateCategoryRequest(string Name, string Description, Guid? ParentCategoryId);