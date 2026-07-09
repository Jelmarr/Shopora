namespace backend.Features.Admin.Categories.UpdateCategory;

public record UpdateCategoryResponse(Guid Id, string Name, Guid? ParentCategoryId, string? Description);
