using backend.Core.Configurations;
using backend.Data;
using backend.Features.Products.Services;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

namespace backend.Core.DependencyInjection;

public static class InfrastructureExtensions
{
    public const string AllowSpecificOrigins = "_myAllowSpecificOrigins";

    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
    {
        // CORS Setup
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

        // Global JSON Setup
        services.ConfigureHttpJsonOptions(options =>
        {
            options.SerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
        });

        // PostgreSQL Database Registration
        var connectionString = configuration.GetConnectionString("DefaultConnection");
        services.AddDbContext<AppDbContext>(options => options.UseNpgsql(connectionString));

        //  OpenAPI Configuration
        services.AddOpenApi();

        // Cloudinary
        services.Configure<CloudinarySettings>(configuration.GetSection("Cloudinary"));

        services.AddScoped<ICloudinaryService, CloudinaryService>();

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