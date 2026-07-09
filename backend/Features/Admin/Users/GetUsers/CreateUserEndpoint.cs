using backend.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Features.Admin.Users.GetUsers;

public static class GetUsersEndpoint
{
    public static void MapGetUsers(this IEndpointRouteBuilder app)
    {
        app.MapGet("/api/users", async (AppDbContext db) =>
        {

            var users = await db.Users
             .Select(user => new GetUsersResponse
             {
                 Id = user.Id,
                 FirstName = user.FirstName,
                 LastName = user.LastName,
                 Email = user.Email,
                 Slug = user.Store.Slug
             })
             .ToListAsync();

            return Results.Ok(users);

        })
        .WithTags("User");
    }
}