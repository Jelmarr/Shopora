using backend.Features.Admin.Users.CheckEmail;
using backend.Features.Admin.Users.CreateUser;
using backend.Features.Admin.Users.GetUsers;
using backend.Features.Admin.Users.UpdateUser;

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