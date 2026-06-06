using System.Security.Claims;

namespace backend.Core.Extensions;

public static class ClaimPrincipalExtension
{
    public static Guid GetUserId(
        this ClaimsPrincipal user)
    {
        var claim = user.FindFirst(ClaimTypes.NameIdentifier);

        if (claim is null)
        {
            throw new UnauthorizedAccessException();
        }

        return Guid.Parse(claim.Value);
    }

    public static Guid GetStoreId(
       this ClaimsPrincipal user)
    {
        var claim =
            user.FindFirst("storeId");

        if (claim is null)
            throw new UnauthorizedAccessException();

        return Guid.Parse(claim.Value);
    }
}