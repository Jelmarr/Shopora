namespace backend.Features.Admin.Categories.GetCategoriesLookup;

public record GetCategoriesLookupResponse
{
    public string Name { get; set; } = string.Empty;
    public Guid? Id { get; set; }
    public string? ParentCategoryName { get; set; }
};