using backend.Features.Admin.Products.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace backend.Features.Admin.Products.ProductConfigurations;

public class ProductOptionConfiguration : IEntityTypeConfiguration<ProductOption>
{
    public void Configure(EntityTypeBuilder<ProductOption> builder)
    {

        builder.ToTable("ProductOptions");
        builder.HasKey(p => p.Id);

        builder.Property(p => p.Name)
            .HasMaxLength(50)
            .IsRequired();

        builder.HasIndex(x => new { x.ProductId, x.Name })
            .IsUnique();

        builder.HasOne(x => x.Product)
            .WithMany(x => x.Options)
            .HasForeignKey(x => x.ProductId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(x => x.Values)
            .WithOne(x => x.ProductOption)
            .HasForeignKey(x => x.ProductOptionId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}