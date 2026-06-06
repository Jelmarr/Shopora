using backend.Features.Products.Enums;

namespace backend.Features.Products.CreateProduct;

public record CreateProductRequest(
    string Name,
    string SKU,
    Guid CategoryId,
    string Description,
    decimal Price,
    decimal? CompareAtPrice,
    decimal? CostPrice,
    int Stock,
    int LowStockThreshold,
    bool IsFeatured,
    ProductStatus Status,
    List<IFormFile>? Images
);
