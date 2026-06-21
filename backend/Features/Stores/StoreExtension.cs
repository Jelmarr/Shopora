using backend.Features.Stores.GetStores;
using backend.Features.Stores.UpdateStore;

namespace backend.Features.Stores;

public static class StoreExtensions
{
    public static IEndpointRouteBuilder MapStoreFeatures(this IEndpointRouteBuilder app)
    {
        var storeGroup = app.MapGroup("");

        storeGroup.MapUpdateStore();
        storeGroup.MapGetStores();

        storeGroup.RequireCors("_myAllowSpecificOrigins");

        return app;
    }
}