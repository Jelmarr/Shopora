using backend.Core.Exceptions;
using backend.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Features.StoreFront.GetLatestProducts;

public class GetLatestProductsHandler
{

    private readonly AppDbContext _db;

    public GetLatestProductsHandler(AppDbContext db)
    {
        _db = db;
    }

    public async Task<List<GetLatestProductsResponse>> Handle(Guid storeId, CancellationToken ct)
    {

        var latestProducts = await _db.Products
            .AsNoTracking()
            .Include(product => product.Images)
            .Take(4)
            .Where(product => product.StoreId == storeId)
            .Select(product => new GetLatestProductsResponse
            {
                Id = product.Id,
                Name = product.Name,
                CategoryName = product.Category.Name,
                Images = product.Images
                    .Select(img => img.ImageUrl)
                    .ToList(),
                PrimaryImage = product.Images
                    .Where(img => img.IsPrimary)
                    .Select(img => img.ImageUrl)
                    .FirstOrDefault(),
                Price = product.Price,
                ComparePrice = product.CompareAtPrice,
                Stock = product.Stock,
                CreatedAt = product.CreatedAt
            })
            .OrderByDescending(p => p.CreatedAt)
            .ToListAsync(ct);

        return latestProducts;

    }

}