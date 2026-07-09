using backend.Core.Extensions;
using FluentValidation;

namespace backend.Features.Admin.Stores.UpdateStore;

public static class UpdateStore
{
    public static void MapUpdateStore(this IEndpointRouteBuilder app)
    {
        app.MapPut("/api/store/{id:guid}", async (
            Guid id,
            UpdateStoreHandler handle,
            UpdateStoreRequest request,
            IValidator<UpdateStoreRequest> validator,
            CancellationToken ct
        ) =>
        {

            var updatedRequest = request with { Id = id };

            await validator.ValidateOrThrowAsync(request, ct);

            var response = handle.Handle(updatedRequest, ct);

            return Results.Ok(response);
        })
        .RequireAuthorization()
        .WithTags("Store");
    }
}