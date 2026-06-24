using backend.Features.Categories.CreateCategories;
using backend.Features.Categories.DeleteCategory;
using backend.Features.Categories.GetCategories;
using backend.Features.Categories.GetCategoriesLookup;
using backend.Features.Categories.UpdateCategory;

namespace backend.Features.Categories;

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