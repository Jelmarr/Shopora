using System.Security.Claims;
using backend.Core.Exceptions;
using backend.Core.Exceptions.ValidatonException;
using backend.Core.Extensions;
using backend.Core.Extensions.StringExtension;
using backend.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Features.Admin.Categories.UpdateCategory;

public class UpdateCategoryHandler
{

    private readonly AppDbContext _db;

    public UpdateCategoryHandler(AppDbContext db)
    {
        _db = db;
    }

    public async Task<UpdateCategoryResponse> Handle(
        ClaimsPrincipal user,
        UpdateCategoryRequest request,
        CancellationToken ct)
    {

        var storeId = user.GetStoreId();

        var category = await _db.Categories
            .FirstOrDefaultAsync(cat => cat.Id == request.Id && cat.StoreId == storeId, ct);

        if (category == null)
        {
            throw new NotFoundException("Category doesn't exists.");
        }

        var isDuplicateName = await _db.Categories.AnyAsync(cat =>
            cat.StoreId == storeId &&
            EF.Functions.ILike(cat.Name, request.Name.Trim()) &&
            cat.Id != category.Id,
            ct);

        if (isDuplicateName)
        {
            throw new ValidationException("name", "A category with this name already exists in your store");
        }

        Guid? mappedParentId = null;

        if (request.ParentCategoryId.HasValue && request.ParentCategoryId.Value != Guid.Empty)
        {

            mappedParentId = request.ParentCategoryId.Value;

            var parentExists = await _db.Categories.AnyAsync(cat =>
                cat.Id == mappedParentId && cat.StoreId == storeId,
                ct
            );

            if (!parentExists)
            {
                throw new ValidationException("parentCategoryId", "The selected parent category doesn't exists");
            }
        }

        category.Name = request.Name.ToCapitalized();
        category.Description = request.Description ?? string.Empty;
        category.ParentCategoryId = mappedParentId;

        await _db.SaveChangesAsync(ct);

        return new UpdateCategoryResponse
        (
           category.Id,
           category.Name,
           category.ParentCategoryId,
           category.Description
        );

    }

}