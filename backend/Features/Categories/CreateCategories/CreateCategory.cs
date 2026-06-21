using System.Security.Claims;
using backend.Core.Extensions;
using FluentValidation;

namespace backend.Features.Categories.CreateCategories;

public static class CreateCategoy
{
    public static void MapCreateCategory(this IEndpointRouteBuilder app)
    {
        app.MapPost("/api/category",
        async (
            ClaimsPrincipal user,
            CreateCategoryRequest request,
            IValidator<CreateCategoryRequest> validator,
            CreateCategoryHandler handler,
            CancellationToken ct
        ) =>
        {

            await validator.ValidateOrThrowAsync(request, ct);

            var response = await handler.Handle(user, request, ct);

            return Results.Created(
                $"/api/categories/${response.Id}",
                response);
        })
        .RequireAuthorization()
        .WithTags("Category");
    }
}