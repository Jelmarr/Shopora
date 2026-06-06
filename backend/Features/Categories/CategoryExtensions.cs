using backend.Features.Categories.CreateCategories;

namespace backend.Features.Categories;

public static class CategoryExtensions
{
    public static IEndpointRouteBuilder MapCategoryFeatures(this IEndpointRouteBuilder app)
    {
        var userGroup = app.MapGroup("");

        userGroup.MapCreateCategory();

        userGroup.RequireCors("_myAllowSpecificOrigins");

        return app;
    }
}