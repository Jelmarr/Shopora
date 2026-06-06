using backend.Features.Products.CreateProduct;

namespace backend.Features.Products;

public static class ProductExtensions
{
    public static IEndpointRouteBuilder MapProductFeatures(this IEndpointRouteBuilder app)
    {
        var userGroup = app.MapGroup("");

        userGroup.MapCreateProduct();

        userGroup.RequireCors("_myAllowSpecificOrigins");

        return app;
    }
}