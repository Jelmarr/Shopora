using backend.Features.StoreFront.GetCategories;
using backend.Features.StoreFront.GetFeaturedProducts;
using backend.Features.StoreFront.GetHeroProducts;
using backend.Features.StoreFront.GetProductById;
using backend.Features.StoreFront.GetProducts;
using backend.Features.StoreFront.GetRelatedProducts;
using backend.Features.StoreFront.GetStoreBySlug;

namespace backend.Features.StoreFront.Extensions;

public static class StoreExtensions
{
    public static IEndpointRouteBuilder MapStoreFeatures(this IEndpointRouteBuilder app)
    {
        var storeGroup = app.MapGroup("");

        storeGroup.MapGetStoreBySlug();
        storeGroup.MapGetProducts();
        storeGroup.MapGetHeroProducts();
        storeGroup.MapGetCategories();
        storeGroup.MapGetFeaturedProducts();
        storeGroup.MapGetProductById();
        storeGroup.MapGetRelatedProducts();

        storeGroup.RequireCors("_myAllowSpecificOrigins");

        return app;
    }
}