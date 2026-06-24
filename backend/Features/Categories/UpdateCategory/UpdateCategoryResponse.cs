namespace backend.Features.Categories.UpdateCategory;

public record UpdateCategoryResponse(Guid Id, string Name, Guid? ParentCategoryId, string? Description);
