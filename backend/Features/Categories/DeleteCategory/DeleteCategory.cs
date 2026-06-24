using System.Security.Claims;

namespace backend.Features.Categories.DeleteCategory;

public static class DeleteCategory
{
    public static void MapDeleteCategory(this IEndpointRouteBuilder app)
    {
        app.MapDelete("/api/category/{id:guid}", async (
            Guid id,
            ClaimsPrincipal user,
            DeleteCategoryHandler handler,
            CancellationToken ct
        ) =>
        {

            var response = await handler.Handle(user, id, ct);

            return Results.Ok(response);
        })
        .RequireAuthorization()
        .WithTags("Category");
    }
}