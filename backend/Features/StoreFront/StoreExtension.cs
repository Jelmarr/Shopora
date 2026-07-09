using backend.Features.StoreFront.GetProducts;
using backend.Features.StoreFront.GetStoreBySlug;

namespace backend.Features.StoreFront.Extensions;

public static class StoreExtensions
{
    public static IEndpointRouteBuilder MapStoreFeatures(this IEndpointRouteBuilder app)
    {
        var storeGroup = app.MapGroup("");

        storeGroup.MapGetStoreBySlug();
        storeGroup.MapGetProducts();

        storeGroup.RequireCors("_myAllowSpecificOrigins");

        return app;
    }
}