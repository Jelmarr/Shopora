using backend.Core.Exceptions;
using backend.Data;
using backend.Features.Products.Services;
using Microsoft.EntityFrameworkCore;

namespace backend.Features.Stores.UpdateStore;

public class UpdateStoreHandler
{
    private readonly AppDbContext _db;
    private readonly ICloudinaryService _cloudinaryService;

    public UpdateStoreHandler(AppDbContext db, ICloudinaryService cloudinaryService)
    {
        _db = db;
        _cloudinaryService = cloudinaryService;
    }

    public async Task<UpdateStoreResponse> Handle(UpdateStoreRequest request, CancellationToken ct)
    {

        bool isReplacingImage = request.Logo is not null;
        CloudinaryUploadResult? uploadResult = null;

        if (isReplacingImage)
        {
            await _cloudinaryService.UploadImageAsync(request.Logo!, "logo");
        }

        using var transation = await _db.Database.BeginTransactionAsync(ct);

        try
        {

            var store = await _db.Stores.FirstOrDefaultAsync(store => request.Id == store.StoreId, ct);

            if (store is null)
            {
                throw new NotFoundException("Store doesn't exists");
            }

            var storeNameExists = await _db.Stores.AnyAsync(store => request.Name == store.Name && store.StoreId != request.Id, ct);

            if (storeNameExists)
            {
                throw new ConflictException("Store name already exists");
            }

            string? oldPublicIdToDelete = isReplacingImage ? store.LogoPublicId : null;

            store.Name = request.Name;
            store.Slug = request.Slug;

            if (isReplacingImage && uploadResult is not null)
            {
                store.LogoPublicId = uploadResult.PublicId;
                store.LogoUrl = uploadResult.Url;
            }

            await _db.SaveChangesAsync(ct);

            await transation.CommitAsync(ct);

            if (!string.IsNullOrEmpty(oldPublicIdToDelete))
            {
                try
                {
                    await _cloudinaryService.DeleteImageAsync(oldPublicIdToDelete);
                }
                catch
                {
                    throw new Exception("Failed to delete old logo public id");
                }
            }

            return new UpdateStoreResponse(store.StoreId, store.Name, store.Slug, store.LogoUrl);

        }
        catch (Exception)
        {

            await transation.RollbackAsync(ct);

            if (uploadResult is not null && !string.IsNullOrEmpty(uploadResult.PublicId))
            {
                await _cloudinaryService.DeleteImageAsync(uploadResult.PublicId);
            }

            throw;
        }

    }

}