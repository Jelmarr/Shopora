using System.Security.Claims;
using backend.Core.Extensions;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace backend.Features.Admin.Products.UpdateProduct;

public static class UpdateProduct
{
    public static void MapUpdateProduct(this IEndpointRouteBuilder app)
    {
        app.MapPut("/api/products/{id:guid}", async (
            Guid id,
            ClaimsPrincipal user,
            UpdateProductHandler handler,
            [FromForm] UpdateProductRequest request,
            IValidator<UpdateProductRequest> validator,
            CancellationToken ct
        ) =>
        {

            var updatedRequest = request with { Id = id };

            await validator.ValidateOrThrowAsync(updatedRequest, ct);

            var response = await handler.Handle(user, updatedRequest, ct);

            return Results.Ok(response);

        })
        .RequireAuthorization()
        .Accepts<UpdateProductRequest>("multipart/form-data")
        .DisableAntiforgery()
        .WithTags("Product");
    }
}
