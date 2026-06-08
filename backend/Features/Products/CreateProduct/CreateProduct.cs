using FluentValidation;
using backend.Core.Extensions;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;

namespace backend.Features.Products.CreateProduct;

public static class CreateProduct
{
    public static void MapCreateProduct(this IEndpointRouteBuilder app)
    {
        app.MapPost("/api/product",
            async (
            ClaimsPrincipal user,
            [FromForm] CreateProductRequest request,
            IValidator<CreateProductRequest> validator,
            CreateProductHandler handler,
            CancellationToken ct) =>
        {

            await validator.ValidateOrThrowAsync(request, ct);

            var response = await handler.Handle(user, request, ct);

            return Results.Created(
                $"/api/products/{response.Id}",
                response);

        })
        .RequireAuthorization()
        .WithTags("Product")
        .Accepts<CreateProductRequest>("multipart/form-data")
        .DisableAntiforgery();
    }
}