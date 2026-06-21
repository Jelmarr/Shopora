using backend.Features.Products.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace backend.Features.Products.Configurations;

public class ProductConfiguration : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {

        builder.ToTable("Products");

        builder.HasKey(p => p.Id);

        builder.Property(p => p.Name)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(p => p.SKU)
            .HasMaxLength(100);

        builder.Property(p => p.Description)
            .HasMaxLength(500);

        builder.Property(p => p.Price)
            .HasPrecision(18, 2)
            .IsRequired();

        builder.Property(p => p.CostPrice)
            .HasPrecision(18, 2);

        builder.Property(p => p.CompareAtPrice)
            .HasPrecision(18, 2);

        builder.Property(p => p.Status)
            .HasConversion<string>()
            .HasMaxLength(20)
            .IsRequired();

        builder.HasOne(p => p.Store)
            .WithMany(s => s.Products)
            .HasForeignKey(p => p.StoreId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(p => p.Category)
            .WithMany(c => c.Products)
            .HasForeignKey(p => p.CategoryId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasIndex(p => p.StoreId);

        builder.HasIndex(p => p.CategoryId);

        // Unique SKU constraint *per store* (Allows same SKU in different stores, but unique within this store)
        builder.HasIndex(p => new { p.StoreId, p.SKU })
            .IsUnique()
            .HasFilter("\"SKU\" IS NOT NULL"); // Ignores null values so empty SKUs don't crash

        builder.HasIndex(p => p.Name)
            .HasMethod("gin")
            .HasOperators("gin_trgm_ops");

        builder.HasQueryFilter(p => !p.IsDeleted);
    }
}