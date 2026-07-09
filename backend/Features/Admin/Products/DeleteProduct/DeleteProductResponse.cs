using backend.Features.Admin.Products.Enums;

namespace backend.Features.Admin.Products.DeleteProduct;

public record DeleteProductResponse(Guid Id, ProductStatus Status, string Message);