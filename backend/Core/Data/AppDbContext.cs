using backend.Features.Admin.Categories.Models;
using backend.Features.Admin.Products.Models;
using backend.Features.Admin.Stores.Models;
using backend.Features.Admin.Users.Models;
using Microsoft.EntityFrameworkCore;


namespace backend.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Store> Stores { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<ProductImage> ProductsImages { get; set; }
    public DbSet<ProductOption> ProductOptions { get; set; }
    public DbSet<ProductOptionValue> ProductOptionValues { get; set; }
    public DbSet<ProductVariant> ProductVariants { get; set; }
    public DbSet<ProductVariantOption> ProductVariantOptions { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // 1. CRITICAL: This MUST be the absolute first line so EF Core creates 
        // the extension script before it tries to build your tables or indexes!
        modelBuilder.HasPostgresExtension("pg_trgm");

        // This single line automatically scans your entire project for any 
        // configuration files (IEntityTypeConfiguration) and applies them!
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
    }


}