namespace backend.Features.Admin.Categories.UpdateCategory;

public record UpdateCategoryRequest(Guid Id, string Name, Guid? ParentCategoryId, string? Description);
