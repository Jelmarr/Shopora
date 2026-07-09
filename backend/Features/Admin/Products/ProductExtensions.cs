using backend.Features.Admin.Products.CreateProduct;
using backend.Features.Admin.Products.DeleteProduct;
using backend.Features.Admin.Products.GetProductById;
using backend.Features.Admin.Products.GetProducts;
using backend.Features.Admin.Products.StatusUpdateProduct;
using backend.Features.Admin.Products.UpdateProduct;

namespace backend.Features.Admin.Products;

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
        productGroup.MapGetProductById();

        productGroup.RequireCors("_myAllowSpecificOrigins");

        return app;
    }
}