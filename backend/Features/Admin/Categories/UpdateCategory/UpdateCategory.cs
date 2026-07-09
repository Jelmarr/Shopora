using System.Security.Claims;
using backend.Core.Extensions;
using FluentValidation;

namespace backend.Features.Admin.Categories.UpdateCategory;

public static class UpdateCategory
{
    public static void MapUpdateCategory(this IEndpointRouteBuilder app)
    {
        app.MapPut("/api/category/{id:guid}",
        async (
            Guid id,
            ClaimsPrincipal user,
            UpdateCategoryRequest request,
            IValidator<UpdateCategoryRequest> validator,
            UpdateCategoryHandler handler,
            CancellationToken ct
        ) =>
        {

            var updatedRequest = request with { Id = id };

            await validator.ValidateOrThrowAsync(updatedRequest, ct);

            var response = await handler.Handle(user, updatedRequest, ct);

            return Results.Ok(response);

        })
        .RequireAuthorization()
        .WithTags("Category");
    }
}