using backend.Data;
using Microsoft.EntityFrameworkCore;
using backend.Features.Auth.Models;

namespace backend.Features.Auth;

public static class LoginEndpoint
{
    public static void MapLogin(this IEndpointRouteBuilder app)
    {
        app.MapPost("/api/auth/login", async (LoginRequest request, TokenGenerator tokenGen, HttpContext context, AppDbContext db) =>
        {

            var user = await db.Users.FirstOrDefaultAsync(user => user.Email == request.Email);

            if (user is null)
            {
                return Results.Json(new { detail = "Invalid email or password." }, statusCode: 401);
            }

            bool isPasswordValid = BCrypt.Net.BCrypt.Verify(request.Password, user.Password);
            if (!isPasswordValid)
            {
                return Results.Json(new { detail = "Incorrect password" }, statusCode: 401);
            }

            // Generate access and refresh tokens using your domain utility helper
            var access = tokenGen.GenerateAccess(user);
            var refresh = tokenGen.GenerateRefresh();

            // Update Database user record context tracking with the active token values
            user.RefreshToken = refresh;
            user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(7);

            await db.SaveChangesAsync();

            // Append HttpOnly cookie securely to response context pipeline
            context.Response.Cookies.Append("refreshToken", refresh, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddDays(7)
            });

            return Results.Ok(new AuthResponse(access, user.Email, user.Role));
        })
        .RequireRateLimiting(AuthRateLimitPolicies.StrictAuthPolicy)
        .WithTags("Authentication");
    }
}