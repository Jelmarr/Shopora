using backend.Features.Categories.CreateCategories;
using backend.Features.Categories.GetCategories;

namespace backend.Features.Categories;

public static class CategoryExtensions
{
    public static IEndpointRouteBuilder MapCategoryFeatures(this IEndpointRouteBuilder app)
    {
        var categoryGroup = app.MapGroup("");

        categoryGroup.MapCreateCategory();
        categoryGroup.MapGetCategories();

        categoryGroup.RequireCors("_myAllowSpecificOrigins");

        return app;
    }
}