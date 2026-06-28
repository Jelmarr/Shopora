using System.Security.Claims;
using System.Text.Json;
using backend.Core.Exceptions;
using backend.Core.Exceptions.ValidatonException;
using backend.Core.Extensions;
using backend.Core.Extensions.StringExtension;
using backend.Data;
using backend.Features.Products.Models;
using backend.Features.Products.Services;
using Microsoft.EntityFrameworkCore;

namespace backend.Features.Products.CreateProduct;

public class CreateProductHandler
{
    private readonly AppDbContext _db;
    private readonly ICloudinaryService _cloudinaryService;

    public CreateProductHandler(AppDbContext db, ICloudinaryService cloudinaryService)
    {
        _db = db;
        _cloudinaryService = cloudinaryService;
    }

    public async Task<CreateProductResponse> Handle(
        ClaimsPrincipal user,
        CreateProductRequest request,
        CancellationToken ct)
    {
        var storeId = user.GetStoreId();
        var uploadResults = new List<CloudinaryUploadResult>();

        var categoryExists = await _db.Categories.AnyAsync(
            c => c.Id == request.CategoryId && c.StoreId == storeId,
            ct
        );

        if (!categoryExists)
        {
            throw new ValidationException("categoryId", "A category name doesn't exist in your store.");
        }

        var productNameExists = await _db.Products
            .Where(p => !p.IsDeleted)
            .AnyAsync(p => p.StoreId == storeId && EF.Functions.ILike(p.Name, request.Name.Trim()), ct);

        if (productNameExists)
        {
            throw new ValidationException("name", "A product with this name already exists in your store.");
        }

        if (!string.IsNullOrEmpty(request.SKU))
        {
            var skuExists = await _db.Products
                .Where(p => !p.IsDeleted)
                .AnyAsync(p => p.StoreId == storeId && EF.Functions.ILike(p.SKU!, request.SKU.Trim()), ct);

            if (skuExists)
            {
                throw new ValidationException("sku", "SKU already exists");
            }
        }

        if (request.Images != null && request.Images.Count > 0)
        {
            var uploadTasks = request.Images.Select(image => _cloudinaryService.UploadImageAsync(image, "products"));
            uploadResults = (await Task.WhenAll(uploadTasks)).ToList();
        }

        using var transaction = await _db.Database.BeginTransactionAsync(ct);

        try
        {
            var product = new Product
            {
                Id = Guid.NewGuid(),
                CategoryId = request.CategoryId,
                StoreId = storeId,
                Name = request.Name.ToCapitalized(),
                SKU = string.IsNullOrWhiteSpace(request.SKU) ? null : request.SKU.Trim(),
                Description = request.Description,
                Price = request.Price,
                CompareAtPrice = request.CompareAtPrice,
                CostPrice = request.CostPrice,
                Stock = request.Stock ?? 0,
                LowStockThreshold = request.LowStockThreshold ?? 0,
                IsFeatured = request.IsFeatured,
                IsTrackInventory = request.IsTrackInventory,
                Status = request.Status,
                CreatedAt = DateTime.UtcNow,
                Images = new List<ProductImage>()
            };

            foreach (var upload in uploadResults)
            {
                product.Images.Add(new ProductImage { ImageUrl = upload.Url });
            }

            _db.Products.Add(product);

            // Handle Relational Option Trees and Dynamic Matrix Permutations
            var jsonOptions = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

            var incomingOptions = string.IsNullOrEmpty(request.ProductOptions)
                ? []
                : JsonSerializer.Deserialize<List<OptionJsonDto>>(request.ProductOptions, jsonOptions) ?? [];

            var incomingVariants = string.IsNullOrEmpty(request.ProductVariants)
                ? []
                : JsonSerializer.Deserialize<List<VariantJsonDto>>(request.ProductVariants, jsonOptions) ?? [];

            // Temporary map to quickly link Variant Join Tables to generated Option Values
            var valueLookup = new Dictionary<string, ProductOptionValue>();

            foreach (var optDto in incomingOptions)
            {
                var option = new ProductOption
                {
                    Id = Guid.NewGuid(),
                    ProductId = product.Id,
                    Name = optDto.Name.Trim()
                };
                _db.ProductOptions.Add(option);

                foreach (var valDto in optDto.Values)
                {
                    var optValue = new ProductOptionValue
                    {
                        Id = Guid.NewGuid(),
                        ProductOptionId = option.Id,
                        Value = valDto.Value.Trim()
                    };
                    _db.ProductOptionValues.Add(optValue);

                    // Form a composite tracking key (e.g., "color:red" or "size:medium")
                    string trackingKey = $"{optDto.Name.ToLower().Trim()}:{valDto.Value.ToLower().Trim()}";
                    valueLookup[trackingKey] = optValue;
                }
            }

            //  Add Variants & Link through the ProductVariantOption Join Table
            foreach (var varDto in incomingVariants)
            {
                var variant = new ProductVariant
                {
                    Id = Guid.NewGuid(),
                    ProductId = product.Id,
                    StoreId = storeId,
                    SKU = string.IsNullOrWhiteSpace(varDto.SKU) ? null : varDto.SKU.Trim(),
                    PriceOverride = varDto.PriceOverride,
                    Stock = varDto.Stock ?? 0
                };
                _db.ProductVariants.Add(variant);

                foreach (var link in varDto.VariantOptionValues)
                {
                    string targetKey = $"{link.OptionName.ToLower().Trim()}:{link.ValueText.ToLower().Trim()}";

                    if (valueLookup.TryGetValue(targetKey, out var matchedValueEntity))
                    {
                        var joinRelation = new ProductVariantOption
                        {
                            ProductVariantId = variant.Id,
                            ProductOptionValueId = matchedValueEntity.Id
                        };
                        _db.ProductVariantOptions.Add(joinRelation);
                    }
                }
            }

            await _db.SaveChangesAsync(ct);
            await transaction.CommitAsync(ct);

            return new CreateProductResponse(
                product.Id,
                product.Name,
                product.Price,
                product.Status
            );
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync(ct);

            if (uploadResults.Any())
            {
                var deleteTasks = uploadResults.Select(img => _cloudinaryService.DeleteImageAsync(img.PublicId));
                await Task.WhenAll(deleteTasks);
            }

            throw new Exception($"Handler Failed! Source: {ex.Source}. Message: {ex.Message}. InnerException: {ex.InnerException?.Message}");
        }
    }
}