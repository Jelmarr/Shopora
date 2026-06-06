using backend.Features.Auth.SocialLogin;

namespace backend.Features.Auth;

public static class AuthExtensions
{
    public static IEndpointRouteBuilder MapAuthFeatures(this IEndpointRouteBuilder app)
    {

        var userGroup = app.MapGroup("");

        userGroup.MapLogin();
        userGroup.MapSocialLogin();
        userGroup.MapRefresh();
        userGroup.MapLogout();

        userGroup.RequireCors("_myAllowSpecificOrigins");

        return app;
    }
}