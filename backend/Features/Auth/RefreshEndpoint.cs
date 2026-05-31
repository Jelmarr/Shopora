using backend.Data;
using Microsoft.EntityFrameworkCore;

public static class RefreshEndpoint
{
    public static void MapRefresh(this IEndpointRouteBuilder app)
    {
        app.MapPost("/api/auth/refresh", async (HttpContext context, TokenGenerator tokenGen, AppDbContext db) =>
        {
            // 1. Automatically extract the refresh token from the secure HttpOnly cookie
            var oldRefreshToken = context.Request.Cookies["refreshToken"];

            if (string.IsNullOrEmpty(oldRefreshToken))
            {
                return Results.Json(new { detail = "Refresh token missing." }, statusCode: 401);
            }

            // 2. Look up the user who owns this refresh token in PostgreSQL
            var user = await db.Users.FirstOrDefaultAsync(u => u.RefreshToken == oldRefreshToken);

            // 3. Security check: Does the user exist, and is the token still within its 7-day lifespan?
            if (user is null || user.RefreshTokenExpiry < DateTime.UtcNow)
            {
                return Results.Json(new { detail = "Invalid or expired refresh token." }, statusCode: 401);
            }

            // 4. Generate a brand new 15-minute Access Token AND a new rolling Refresh Token
            var newAccessToken = tokenGen.GenerateAccess(user);
            var newRefreshToken = tokenGen.GenerateRefresh();

            // 5. Update the database context with the new rolling token and extend the expiry by 7 more days
            user.RefreshToken = newRefreshToken;
            user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(7);
            await db.SaveChangesAsync();

            // 6. Overwrite the old browser cookie with the fresh rolling token
            context.Response.Cookies.Append("refreshToken", newRefreshToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddDays(7)
            });

            // 7. Return the new access token to the frontend (e.g., Next.js) in memory
            return Results.Ok(new { accessToken = newAccessToken });
        });
    }
}