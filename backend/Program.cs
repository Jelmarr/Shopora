using backend.Features.Users;
using backend.Core.DependencyInjection;
using backend.Features.Auth;
using backend.Features.Products;
using backend.DependencyInjection;
using backend.Features.Categories;
using backend.Features.Products.Services;

var builder = WebApplication.CreateBuilder(args);

// Core Services Layer Bundling
builder.Services
    .AddExceptionHandling()
    .AddSecurityServices(builder.Configuration)
    .AddInfrastructureServices(builder.Configuration)
    .AddAuthRateLimiting();

var app = builder.Build();

// HTTP Request Processing Pipeline Order
app.UseExceptionHandler();

app.UseRouting();
app.UseCors(InfrastructureExtensions.AllowSpecificOrigins);


app.UseRateLimiter();

app.UseAuthentication();
app.UseAuthorization();

// Environment Specifications
app.UseDevelopmentDocumentation();

// Vertical Slice Domain Mappings
app.MapAuthFeatures();
app.MapUserFeatures();
app.MapCategoryFeatures();
app.MapProductFeatures();

app.Run();

