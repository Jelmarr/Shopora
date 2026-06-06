using backend.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Features.Auth;

public static class LogoutEndpoint
{
    public static void MapLogout(this IEndpointRouteBuilder app)
    {
        app.MapPost("api/auth/logout", async (
            AppDbContext db,
            HttpContext context) =>
        {
            if (context.Request.Cookies.TryGetValue("refreshToken", out var refreshToken))
            {
                var user = await db.Users.FirstOrDefaultAsync(u => u.RefreshToken == refreshToken);
                if (user is not null)
                {
                    user.RefreshToken = null;
                    user.RefreshTokenExpiry = null;
                    await db.SaveChangesAsync();
                }
            }

            context.Response.Cookies.Delete("refreshToken", new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict
            });

            return Results.Ok(new { message = "Logged out successfully" });
        })
        .WithTags("Authentication");
    }
}