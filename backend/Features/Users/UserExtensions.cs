using backend.Features.Users.CreateUser;
using backend.Features.Users.GetUsers;
using backend.Features.Users.UpdateUser;

namespace backend.Features.Users;

public static class UserExtensions
{
    public static void MapUserFeatures(this IEndpointRouteBuilder app)
    {
        app.MapGetUsers();
        app.MapCreateUser();
        app.MapUpdateUser();
    }
}