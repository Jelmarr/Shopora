using System.Security.Claims;
using backend.Core.Exceptions;
using backend.Core.Extensions;
using backend.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Features.Products.StatusUpdateProduct;

public class StatusUpdateProductHandler
{
    private readonly AppDbContext _db;

    public StatusUpdateProductHandler(AppDbContext db)
    {
        _db = db;
    }

    public async Task<StatusUpdateProductResponse> Handle(ClaimsPrincipal user, Guid id, StatusUpdateProductRequest request, CancellationToken ct)
    {

        var storeId = user.GetStoreId();

        var product = await _db.Products
            .FirstOrDefaultAsync(p => p.Id == id && p.StoreId == storeId, ct);

        if (product is null)
        {
            throw new NotFoundException("Product does not exist.");
        }

        product.Status = request.Status;
        product.UpdatedAt = DateTime.UtcNow;

        await _db.SaveChangesAsync(ct);

        return new StatusUpdateProductResponse(
            product.Id,
            product.Name,
            request.Status
        );

    }
}