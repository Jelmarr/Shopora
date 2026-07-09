using backend.Features.Admin.Products.Enums;

namespace backend.Features.Admin.Products.StatusUpdateProduct;

public record StatusUpdateProductResponse(Guid Id, string Name, ProductStatus Status);