using backend.Features.Auth.SocialLogin;

public static class AuthExtensions
{
    public static IEndpointRouteBuilder MapAuthFeatures(this IEndpointRouteBuilder app)
    {

        var userGroup = app.MapGroup("");

        userGroup.MapLogin();
        userGroup.MapSocialLogin();
        userGroup.MapRefresh();

        userGroup.RequireCors("_myAllowSpecificOrigins");

        return app;
    }
}