using backend.Features.Admin.Products.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace backend.Features.Admin.Products.ProductConfigurations;

public class ProductVariantOptionConfiguration : IEntityTypeConfiguration<ProductVariantOption>
{
    public void Configure(EntityTypeBuilder<ProductVariantOption> builder)
    {
        builder.ToTable("ProductVariantOptions");

        builder.HasKey(x => new { x.ProductVariantId, x.ProductOptionValueId });

        builder.HasOne(x => x.ProductVariant)
            .WithMany(x => x.Options)
            .HasForeignKey(x => x.ProductVariantId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(x => x.ProductOptionValue)
            .WithMany(x => x.VariantOptions)
            .HasForeignKey(x => x.ProductOptionValueId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}