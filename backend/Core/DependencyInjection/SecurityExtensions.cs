using backend.Features.Auth;
using FluentValidation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace backend.Core.DependencyInjection;

public static class SecurityExtensions
{
    public static IServiceCollection AddSecurityServices(this IServiceCollection services, IConfiguration configuration)
    {
        // 1. Core Scoped Dependencies
        services.AddScoped<TokenGenerator>();
        services.AddAuthorization();

        // 2. JWT Configuration Block
        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = configuration["Jwt:Issuer"],
                ValidAudience = configuration["Jwt:Audience"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]!)),
                ClockSkew = TimeSpan.Zero
            };
        });

        // 3. Validation Rules Discovery & CamelCase Matching Rules
        var currentAssembly = typeof(Program).Assembly;

        services.AddValidatorsFromAssembly(currentAssembly);

        var handlerTypes = currentAssembly.GetTypes()
            .Where(t => t.IsClass && !t.IsAbstract && t.Name.EndsWith("Handler"));

        foreach (var type in handlerTypes)
        {
            services.AddScoped(type);
        }

        ValidatorOptions.Global.PropertyNameResolver = (_, member, _) =>
        {
            if (member == null) return null;
            return char.ToLowerInvariant(member.Name[0]) + member.Name[1..];
        };

        return services;
    }
}