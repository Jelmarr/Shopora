using backend.Data;
using backend.Features.Users.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Features.Auth.SocialLogin;

public record SocialLoginRequest(string Email, string FirstName, string LastName, string Provider);

public static class SocialLoginEndpoint
{
    public static void MapSocialLogin(this IEndpointRouteBuilder app)
    {
        app.MapPost("api/auth/social", async (
            SocialLoginRequest request,
            AppDbContext db,
            TokenGenerator tokenGen,
            HttpContext context) =>
        {
            var user = await db.Users.FirstOrDefaultAsync(u => u.Email == request.Email);

            if (user is null)
            {
                user = new User
                {
                    Id = Guid.NewGuid(),
                    FirstName = request.FirstName,
                    LastName = request.LastName,
                    Email = request.Email,
                    Password = string.Empty,
                    Role = "User",
                    IsVerified = true
                };

                db.Users.Add(user);
                await db.SaveChangesAsync();
            }

            var access = tokenGen.GenerateAccess(user);
            var refresh = tokenGen.GenerateRefresh();

            user.RefreshToken = refresh;
            user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(7);
            await db.SaveChangesAsync();

            context.Response.Cookies.Append("refreshToken", refresh, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddDays(7)
            });

            return Results.Ok(new AuthResponse(access, user.Email, user.Role));
        });
    }
}