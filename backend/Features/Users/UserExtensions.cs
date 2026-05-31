using backend.Features.Users.CheckEmail;
using backend.Features.Users.CreateUser;
using backend.Features.Users.GetUsers;
using backend.Features.Users.UpdateUser;

namespace backend.Features.Users;

public static class UserExtensions
{
    public static IEndpointRouteBuilder MapUserFeatures(this IEndpointRouteBuilder app)
    {

        var userGroup = app.MapGroup("");

        userGroup.MapGetUsers();
        userGroup.MapCreateUser();
        userGroup.MapUpdateUser();
        userGroup.MapCheckEmail();

        userGroup.RequireCors("_myAllowSpecificOrigins");

        return app;
    }
}