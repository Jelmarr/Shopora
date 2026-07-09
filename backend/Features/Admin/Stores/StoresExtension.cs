using backend.Features.Admin.Stores.GetStores;
using backend.Features.Admin.Stores.UpdateStore;

namespace backend.Features.Stores.Extensions;

public static class StoresExtensions
{
    public static IEndpointRouteBuilder MapStoresFeatures(this IEndpointRouteBuilder app)
    {
        var storeGroup = app.MapGroup("");

        storeGroup.MapUpdateStore();
        storeGroup.MapGetStores();

        storeGroup.RequireCors("_myAllowSpecificOrigins");

        return app;
    }
}