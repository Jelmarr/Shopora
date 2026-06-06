using backend.Data;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

namespace backend.Core.DependencyInjection;

public static class InfrastructureExtensions
{
    public const string AllowSpecificOrigins = "_myAllowSpecificOrigins";

    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
    {
        // 1. CORS Setup
        services.AddCors(options =>
        {
            options.AddPolicy(name: AllowSpecificOrigins, policy =>
            {
                policy.WithOrigins("http://localhost:3000")
                      .AllowAnyHeader()
                      .AllowAnyMethod()
                      .AllowCredentials();
            });
        });

        // 2. Global JSON Setup
        services.ConfigureHttpJsonOptions(options =>
        {
            options.SerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
        });

        // 3. PostgreSQL Database Registration
        var connectionString = configuration.GetConnectionString("DefaultConnection");
        services.AddDbContext<AppDbContext>(options => options.UseNpgsql(connectionString));

        // 4. OpenAPI Configuration
        services.AddOpenApi();

        return services;
    }

    public static IApplicationBuilder UseDevelopmentDocumentation(this WebApplication app)
    {
        if (app.Environment.IsDevelopment())
        {
            app.MapOpenApi();
            app.MapScalarApiReference();
        }
        return app;
    }
}