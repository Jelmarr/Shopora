using backend.Features.Products.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace backend.Features.Products.ProductConfigurations;

public class ProductOptionValueConfiguration : IEntityTypeConfiguration<ProductOptionValue>
{
    public void Configure(EntityTypeBuilder<ProductOptionValue> builder)
    {

        builder.ToTable("ProductOptionValues");

        builder.HasKey(p => p.Id);

        builder.Property(p => p.Value)
            .HasMaxLength(50)
            .IsRequired();

        builder.HasIndex(x => new { x.ProductOptionId, x.Value })
            .IsUnique();

        builder.HasOne(x => x.ProductOption)
            .WithMany(x => x.Values)
            .HasForeignKey(x => x.ProductOptionId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(x => x.VariantOptions)
            .WithOne(x => x.ProductOptionValue)
            .HasForeignKey(x => x.ProductOptionValueId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}