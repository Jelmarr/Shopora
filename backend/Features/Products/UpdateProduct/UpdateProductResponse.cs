using backend.Features.Products.Enums;

namespace backend.Features.Products.UpdateProduct;

public record UpdateProductResponse(
    Guid Id,
    string Message
);