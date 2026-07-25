using backend.Core.Exceptions;
using backend.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Features.StoreFront.GetHeroProducts;

public class GetHeroProductsHandler
{

    private readonly AppDbContext _db;

    public GetHeroProductsHandler(AppDbContext db)
    {
        _db = db;
    }

    public async Task<List<GetHeroProductsResponse>> Handle(Guid storeId, CancellationToken ct)
    {

        var latestProducts = await _db.Products
            .AsNoTracking()
            .Include(product => product.Images)
            .Where(product => product.StoreId == storeId)
            .Select(product => new GetHeroProductsResponse
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                PrimaryImageUrl = product.Images
                    .Where(img => img.IsPrimary)
                    .Select(img => img.ImageUrl)
                    .FirstOrDefault(),
                CreatedAt = product.CreatedAt
            })
            .OrderByDescending(p => p.CreatedAt)
            .Take(5)
            .ToListAsync();

        if (latestProducts.Count == 0)
        {
            throw new ConflictException("There's no product in this store");
        }

        return latestProducts;

    }

}