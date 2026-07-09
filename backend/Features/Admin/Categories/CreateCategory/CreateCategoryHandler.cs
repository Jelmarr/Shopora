using System.Security.Claims;
using backend.Core.Exceptions.ValidatonException;
using backend.Core.Extensions;
using backend.Core.Extensions.StringExtension;
using backend.Data;
using backend.Features.Admin.Categories.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Features.Admin.Categories.CreateCategories;

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

        var existingCategory = await _db.Categories
            .Where(cat => !cat.IsDeleted)
            .AnyAsync(cat =>
                EF.Functions.ILike(cat.Name, request.Name.Trim()) && cat.StoreId == storeId, ct);

        if (existingCategory)
        {
            throw new ValidationException("name", "Category name already exists in your store.");
        }

        Guid? mappedParentId = null;

        if (request.ParentCategoryId.HasValue && request.ParentCategoryId.Value != Guid.Empty)
        {

            mappedParentId = request.ParentCategoryId.Value;

            var parentExists = await _db.Categories.AnyAsync(cat => cat.Id == mappedParentId && cat.StoreId == storeId, ct);

            if (!parentExists)
            {
                throw new ValidationException("parentCategoryId", "The selected parent category doesn't exists");
            }
        }

        var category = new Category
        {
            Id = Guid.NewGuid(),
            StoreId = storeId,
            Description = request.Description,
            Name = request.Name.ToCapitalized(),
            ParentCategoryId = mappedParentId,
            CreatedAt = DateTime.UtcNow
        };

        _db.Categories.Add(category);

        await _db.SaveChangesAsync(ct);

        return new CreateCategoryResponse(
            category.Id,
            category.Name,
            category.Description,
            category.ParentCategoryId
        );

    }


}