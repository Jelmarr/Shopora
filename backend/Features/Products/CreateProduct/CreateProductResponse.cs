using backend.Features.Products.Enums;

namespace backend.Features.Products.CreateProduct;

public record CreateProductResponse(
    Guid Id,
    string Name,
    decimal Price,
    ProductStatus Status
);