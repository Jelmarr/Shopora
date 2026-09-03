using System.Text.Json;
using backend.Core.Configurations;
using backend.Data;
using backend.Features.Admin.Products.Services;
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
                  var frontendUrl = configuration["FrontendUrl"];

                  if (string.IsNullOrEmpty(frontendUrl))
                  {
                      throw new InvalidOperationException(
                          "FrontendUrl configuration is missing."
                      );
                  }

                  policy.WithOrigins(frontendUrl)
                      .AllowAnyHeader()
                      .AllowAnyMethod()
                      .AllowCredentials();
              });
          });

        // Global JSON Setup
        services.ConfigureHttpJsonOptions(options =>
        {
            options.SerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;

            options.SerializerOptions.Converters.Add(
                new System.Text.Json.Serialization.JsonStringEnumConverter()
            );
        });
        services.AddControllers()
            .AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
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