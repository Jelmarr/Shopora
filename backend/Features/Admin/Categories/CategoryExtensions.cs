using backend.Features.Admin.Categories.CreateCategories;
using backend.Features.Admin.Categories.DeleteCategory;
using backend.Features.Admin.Categories.GetCategories;
using backend.Features.Admin.Categories.GetCategoriesLookup;
using backend.Features.Admin.Categories.UpdateCategory;

namespace backend.Features.Admin.Categories.Extension;

public static class CategoryExtensions
{
    public static IEndpointRouteBuilder MapCategoryFeatures(this IEndpointRouteBuilder app)
    {
        var categoryGroup = app.MapGroup("");

        categoryGroup.MapCreateCategory();
        categoryGroup.MapGetCategories();
        categoryGroup.MapUpdateCategory();
        categoryGroup.MapDeleteCategory();
        categoryGroup.MapGetCategoriesLookup();

        categoryGroup.RequireCors("_myAllowSpecificOrigins");

        return app;
    }
}