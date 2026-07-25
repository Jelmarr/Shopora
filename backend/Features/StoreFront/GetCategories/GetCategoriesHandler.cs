using backend.Core.Exceptions;
using backend.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Features.StoreFront.GetCategories;

public class GetCategoriesHandler
{

    private readonly AppDbContext _db;

    public GetCategoriesHandler(AppDbContext db)
    {
        _db = db;
    }

    public async Task<List<GetCategoriesResponse>> Handle(Guid storeId, CancellationToken ct)
    {

        var categories = await _db.Categories
        .AsNoTracking()
        .Where(category => category.StoreId == storeId)
        .Select(category => new GetCategoriesResponse
        {
            Id = category.Id,
            Name = category.Name
        })
        .ToListAsync(ct);

        if (categories.Count == 0)
        {
            throw new ConflictException("There's no categories in this store.");
        }

        return categories;

    }

}