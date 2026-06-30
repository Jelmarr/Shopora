using backend.Features.Products.Enums;

namespace backend.Features.Products.StatusUpdateProduct;

public record StatusUpdateProductResponse(Guid Id, string Name, ProductStatus Status);