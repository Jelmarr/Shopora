namespace backend.Features.Admin.Categories.DeleteCategory;

public record DeleteCategoryResponse(string Name, Guid? Id, string? Description);