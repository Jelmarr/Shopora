namespace backend.Features.Categories.DeleteCategory;

public record DeleteCategoryResponse(string Name, Guid? Id, string? Description);