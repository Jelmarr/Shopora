using backend.Features.Categories.Models;
using backend.Features.Products.Models;
using backend.Features.Stores.Models;
using backend.Features.Users.Models;
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

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // This single line automatically scans your entire project for any 
        // configuration files (IEntityTypeConfiguration) and applies them!
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
    }


}