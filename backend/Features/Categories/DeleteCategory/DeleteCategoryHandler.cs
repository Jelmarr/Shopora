using System.Security.Claims;
using backend.Core.Exceptions;
using backend.Core.Extensions;
using backend.Data;
using backend.Features.Categories.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Features.Categories.DeleteCategory;

public class DeleteCategoryHandler
{

    private readonly AppDbContext _db;

    public DeleteCategoryHandler(AppDbContext db)
    {
        _db = db;
    }

    public async Task<DeleteCategoryResponse> Handle(ClaimsPrincipal user, Guid id, CancellationToken ct)
    {

        var storedId = user.GetStoreId();

        var category = await _db.Categories.FirstOrDefaultAsync(cat =>
            cat.Id == id &&
            cat.StoreId == storedId,
            ct);

        if (category is null)
        {
            throw new NotFoundException("Category doesn't exist in your store.");
        }

        var hasActiveSubcategories = await _db.Categories.AnyAsync(cat =>
            cat.ParentCategoryId == id &&
            cat.StoreId == storedId &&
            !cat.IsDeleted,
            ct);

        if (hasActiveSubcategories)
        {
            throw new ConflictException("You can't delete this category because it's has active subcategories");
        }

        category.IsDeleted = true;
        category.DeletedAt = DateTime.UtcNow;
        category.Status = CategoryStatus.Inactive;

        await _db.SaveChangesAsync(ct);

        return new DeleteCategoryResponse(
            category.Name,
            id,
            category.Description
        );

    }
}