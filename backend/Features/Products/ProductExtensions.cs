using backend.Features.Products.CreateProduct;
using backend.Features.Products.GetProducts;
using backend.Features.Products.UpdateProduct;

namespace backend.Features.Products;

public static class ProductExtensions
{
    public static IEndpointRouteBuilder MapProductFeatures(this IEndpointRouteBuilder app)
    {
        var userGroup = app.MapGroup("");

        userGroup.MapCreateProduct();
        userGroup.MapUpdateProduct();
        userGroup.MapGetProducts();

        userGroup.RequireCors("_myAllowSpecificOrigins");

        return app;
    }
}