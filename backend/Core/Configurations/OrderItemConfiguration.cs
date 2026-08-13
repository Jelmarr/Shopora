using backend.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace backend.Core.Configurations;

public class OrderItemConfiguration : IEntityTypeConfiguration<OrderItem>
{
    public void Configure(EntityTypeBuilder<OrderItem> builder)
    {
        builder.ToTable("OrderItems");

        builder.HasKey(i => i.Id);

        builder.Property(i => i.ProductName)
            .IsRequired()
            .HasMaxLength(300);

        builder.Property(i => i.UnitPrice)
            .HasPrecision(18, 2);

        builder.Property(i => i.Quantity)
            .IsRequired();

        builder.Ignore(i => i.LineTotal); // computed property, not a DB column

        // Relationships

        builder.HasOne(i => i.Order)
            .WithMany(o => o.Items)
            .HasForeignKey(i => i.OrderId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(i => i.Product)
            .WithMany()
            .HasForeignKey(i => i.ProductId)
            .OnDelete(DeleteBehavior.Restrict); // don't let a product deletion cascade-delete past order line items

        builder.HasOne(i => i.ProductVariant)
            .WithMany()
            .HasForeignKey(i => i.ProductVariantId)
            .OnDelete(DeleteBehavior.Restrict)
            .IsRequired(false); // nullable, for products using the implicit default variant

        builder.HasIndex(i => i.OrderId);
    }
}