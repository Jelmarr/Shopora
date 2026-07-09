namespace backend.Features.Admin.Categories.CreateCategories;

public record CreateCategoryRequest(string Name, string Description, Guid? ParentCategoryId);