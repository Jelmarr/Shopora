using System.Security.Claims;
using backend.Core.Exceptions;
using backend.Core.Extensions;
using backend.Data;
using backend.Features.Products.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Features.Products.CreateProduct;

public class CreateProductHandler
{
    private readonly AppDbContext _db;

    public CreateProductHandler(AppDbContext db)
    {
        _db = db;
    }

    public async Task<CreateProductResponse> Handle(
        ClaimsPrincipal user,
        CreateProductRequest request,
        CancellationToken ct)
    {

        var storeId = user.GetStoreId();
        var userId = user.GetUserId();

        var categoryExists = await _db.Categories.AnyAsync(
            c => c.CategoryId == request.CategoryId && c.StoreId == storeId,
            ct
        );

        if (!categoryExists)
        {
            throw new NotFoundException("Category not found.");
        }

        var skuExists = await _db.Products.AnyAsync(
            p => p.SKU == request.SKU && p.StoreId == storeId,
            ct
        );

        if (skuExists)
        {
            throw new ConflictException("SKU already exists");
        }

        var product = new Product
        {
            Id = Guid.NewGuid(),
            CategoryId = request.CategoryId,
            StoreId = storeId,
            Name = request.Name,
            SKU = request.SKU,
            Description = request.Description,
            Price = request.Price,
            CompareAtPrice = request.CompareAtPrice,
            CostPrice = request.CostPrice,
            Stock = request.Stock,
            LowStockThreshold = request.LowStockThreshold,
            IsFeatured = request.IsFeatured,
            Status = request.Status,
            CreatedAt = DateTime.UtcNow
        };

        _db.Products.Add(product);

        await _db.SaveChangesAsync(ct);

        return new CreateProductResponse(
            product.Id,
            product.Name,
            product.Price,
            product.Status
        );
    }

}