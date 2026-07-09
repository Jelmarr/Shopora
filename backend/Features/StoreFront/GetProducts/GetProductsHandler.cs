using backend.Core.Exceptions;
using backend.Data;
using backend.Features.Admin.Products.Enums;
using Microsoft.EntityFrameworkCore;

namespace backend.Features.StoreFront.GetProducts;

public class GetProductHandler
{

    private readonly AppDbContext _db;

    public GetProductHandler(AppDbContext db)
    {
        _db = db;
    }

    public async Task<List<GetProductResponse>> Handle(Guid storeId, CancellationToken ct)
    {

        var products = await _db.Products
            .AsNoTracking()
            .Include(product => product.Category)
            .Include(product => product.Images)
            .Where(product => product.StoreId == storeId && product.Status == ProductStatus.Active)
            .Select(product => new GetProductResponse
            {
                Id = product.Id,
                Name = product.Name,
                CategoryId = product.CategoryId,
                CategoryName = product.Category.Name,
                Stock = product.Stock,
                IsFeatured = product.IsFeatured,
                Images = product.Images
                    .Select(image => image.ImageUrl)
                    .ToList()
            })
            .ToListAsync(ct);

        if (products is null)
        {
            throw new ConflictException("There's no product in this store");
        }

        return products;

    }

}