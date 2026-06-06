using backend.Core.Middlewares;

namespace backend.DependencyInjection;

public static class ExceptionExtensions
{
    public static IServiceCollection AddExceptionHandling(
        this IServiceCollection services
    )
    {
        services.AddExceptionHandler<GlobalExceptionHandler>();

        services.AddProblemDetails();

        return services;
    }
}