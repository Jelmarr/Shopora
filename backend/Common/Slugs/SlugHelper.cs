using backend.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Features.Common.Slugs;

public static class SlugHelper
{
    public static async Task<string> GenerateUniqueSlugAsync(AppDbContext db, string baseSlug)
    {
        var slug = baseSlug;
        var suffix = 1;

        while (await db.Stores.AnyAsync(s => s.Slug == slug))
        {
            slug = $"{baseSlug}-{suffix}";
            suffix++;
        }

        return slug;
    }
}