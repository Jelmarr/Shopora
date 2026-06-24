namespace backend.Features.Categories.CreateCategories;

public record CreateCategoryResponse(Guid Id, string Name, string Description, Guid? ParentCategoryId);