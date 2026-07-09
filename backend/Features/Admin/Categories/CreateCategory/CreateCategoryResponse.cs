namespace backend.Features.Admin.Categories.CreateCategories;

public record CreateCategoryResponse(Guid Id, string Name, string Description, Guid? ParentCategoryId);