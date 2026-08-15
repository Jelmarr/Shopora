using backend.Features.Users;
using backend.Core.DependencyInjection;
using backend.Features.Auth;
using backend.DependencyInjection;
using backend.Features.Admin.Products;
using backend.Features.Stores.Extensions;
using backend.Features.StoreFront.Extensions;
using backend.Features.Admin.Categories.Extension;
using backend.Features.Admin.Orders;

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

// Admin
app.MapUserFeatures();
app.MapCategoryFeatures();
app.MapProductFeatures();
app.MapStoresFeatures();
app.MapOrdersFeatures();

// Store
app.MapStoreFeatures();

app.Run();

