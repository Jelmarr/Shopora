using backend.Features.Products.CreateProduct;
using backend.Features.Products.DeleteProduct;
using backend.Features.Products.GetProducts;
using backend.Features.Products.StatusUpdateProduct;
using backend.Features.Products.UpdateProduct;

namespace backend.Features.Products;

public static class ProductExtensions
{
    public static IEndpointRouteBuilder MapProductFeatures(this IEndpointRouteBuilder app)
    {
        var productGroup = app.MapGroup("");

        productGroup.MapCreateProduct();
        productGroup.MapUpdateProduct();
        productGroup.MapGetProducts();
        productGroup.MapDeleteProduct();
        productGroup.MapStatusUpdateProduct();

        productGroup.RequireCors("_myAllowSpecificOrigins");

        return app;
    }
}