using backend.Features.Products.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace backend.Features.Products.ProductConfigurations;

public class ProductVariantConfiguration : IEntityTypeConfiguration<ProductVariant>
{
    public void Configure(EntityTypeBuilder<ProductVariant> builder)
    {

        builder.ToTable("ProductVariants");

        builder.HasKey(p => p.Id);

        builder.Property(p => p.SKU)
            .HasMaxLength(100);

        builder.Property(p => p.PriceOverride)
            .HasPrecision(18, 2);

        builder.Property(p => p.Stock);

        builder.HasIndex(p => new { p.StoreId, p.SKU })
            .IsUnique()
            .HasFilter("\"SKU\" IS NOT NULL");

        builder.HasOne(x => x.Product)
            .WithMany(x => x.Variants)
            .HasForeignKey(x => x.ProductId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(x => x.Options)
            .WithOne(x => x.ProductVariant)
            .HasForeignKey(x => x.ProductVariantId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}