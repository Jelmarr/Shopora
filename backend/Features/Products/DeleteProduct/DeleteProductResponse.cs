using backend.Features.Products.Enums;

namespace backend.Features.Products.DeleteProduct;

public record DeleteProductResponse(Guid Id, ProductStatus Status, string Message);