using System.Security.Claims;
using backend.Core.Exceptions;
using backend.Core.Extensions;
using backend.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Features.Products.GetProductById;

public class GetProductByIdHandler
{
    private readonly AppDbContext _db;

    public GetProductByIdHandler(AppDbContext db)
    {
        _db = db;
    }

    public async Task<GetProductByIdResponse> Handle(
        ClaimsPrincipal user,
        Guid id,
        CancellationToken ct
    )
    {

        var storeId = user.GetStoreId();

        var product = await _db.Products
            .AsNoTracking()
            .Include(p => p.Category)
            .Include(p => p.Images)
            .Include(p => p.Options)
                .ThenInclude(o => o.Values)
            .Include(p => p.Variants)
                .ThenInclude(v => v.Options)
                    .ThenInclude(o => o.ProductOptionValue)
                        .ThenInclude(ov => ov.ProductOption)
            .Where(p => p.Id == id && p.StoreId == storeId && !p.IsDeleted)
            .Select(p => new GetProductByIdResponse
            {
                Id = p.Id,
                Name = p.Name,
                CategoryId = p.CategoryId,
                Status = p.Status,
                IsFeatured = p.IsFeatured,
                CostPrice = p.CostPrice ?? 0,
                CompareAtPrice = p.CompareAtPrice ?? 0,
                Price = p.Price,
                IsTrackInventory = p.IsTrackInventory,
                SKU = p.SKU ?? "No SKU",
                Stock = p.Stock,
                LowStockThreshold = p.LowStockThreshold,
                Description = p.Description,
                Images = p.Images.Select(img => img.ImageUrl).ToList(),
                Options = p.Options.Select(o => new ProductOptionResponse
                {
                    Id = o.Id,
                    Name = o.Name,
                    Values = o.Values.Select(v => v.Value).ToList()
                }).ToList(),
                Variants = p.Variants.Select(variant => new ProductVariantResponse
                {
                    SKU = variant.SKU ?? "",
                    PriceOverride = variant.PriceOverride,
                    Stock = variant.Stock,
                    Options = variant.Options.Select(o => new ProductVariantOptionResponse
                    {
                        Name = o.ProductOptionValue.ProductOption.Name,
                        Value = o.ProductOptionValue.Value
                    }).ToList()
                }).ToList()
            })
            .FirstOrDefaultAsync(ct);

        if (product is null)
        {
            throw new NotFoundException("Product does not exist");
        }

        return product;

    }

}