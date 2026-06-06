using System.Security.Claims;
using backend.Core.Exceptions;
using backend.Core.Extensions;
using backend.Data;
using backend.Features.Categories.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Features.Categories.CreateCategories;

public class CreateCategoryHandler
{

    private readonly AppDbContext _db;

    public CreateCategoryHandler(AppDbContext db)
    {
        _db = db;
    }

    public async Task<CreateCategoryResponse> Handle(
        ClaimsPrincipal user,
        CreateCategoryRequest request,
        CancellationToken ct)
    {

        var storeId = user.GetStoreId();
        var userId = user.GetUserId();

        var existingCategory = await _db.Categories.AnyAsync(cat => cat.Name == request.Name && cat.StoreId == storeId, ct);

        if (existingCategory)
        {
            throw new ConflictException("Category alaredy exists");
        }

        var category = new Category
        {
            CategoryId = Guid.NewGuid(),
            StoreId = storeId,
            Name = request.Name,
            CreatedAt = DateTime.UtcNow
        };

        _db.Categories.Add(category);

        await _db.SaveChangesAsync(ct);

        return new CreateCategoryResponse(
            category.CategoryId,
            category.Name
        );

    }


}