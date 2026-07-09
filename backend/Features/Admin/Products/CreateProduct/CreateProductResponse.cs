using backend.Features.Admin.Products.Enums;

namespace backend.Features.Admin.Products.CreateProduct;

public record CreateProductResponse(
    Guid Id,
    string Name,
    decimal Price,
    ProductStatus Status
);