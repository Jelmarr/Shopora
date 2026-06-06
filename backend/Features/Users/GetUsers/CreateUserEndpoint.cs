using backend.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Features.Users.GetUsers;

public static class GetUsersEndpoint
{
    public static void MapGetUsers(this IEndpointRouteBuilder app)
    {
        app.MapGet("/api/users", async (AppDbContext db) =>
        {

            var users = await db.Users
             .Select(user => new GetUsersResponse(
                 user.Id,
                 user.FirstName,
                 user.LastName,
                 user.Email
             ))
             .ToListAsync();

            return Results.Ok(users);

        })
        .WithTags("User");
    }
}