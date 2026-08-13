using backend.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace backend.Core.Configurations;

public class OrderConfiguration : IEntityTypeConfiguration<Order>
{
    public void Configure(EntityTypeBuilder<Order> builder)
    {
        builder.ToTable("Orders");

        builder.HasKey(o => o.Id);

        builder.Property(o => o.CustomerEmail)
            .IsRequired()
            .HasMaxLength(320); // RFC 5321 max email length

        builder.Property(o => o.CustomerName)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(o => o.ShippingAddress)
            .IsRequired()
            .HasMaxLength(500);

        builder.Property(o => o.ShippingCity)
            .IsRequired()
            .HasMaxLength(150);

        builder.Property(o => o.ShippingPostalCode)
            .IsRequired()
            .HasMaxLength(20);

        builder.Property(o => o.ShippingCountry)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(o => o.Subtotal)
            .HasPrecision(18, 2);

        builder.Property(o => o.ShippingFee)
            .HasPrecision(18, 2);

        builder.Property(o => o.Total)
            .HasPrecision(18, 2);

        builder.Property(o => o.Status)
            .HasConversion<string>() // store enum as readable text, not int, for easier DB inspection
            .HasMaxLength(20)
            .IsRequired();

        builder.Property(o => o.StripeSessionId)
            .HasMaxLength(255);

        builder.Property(o => o.StripePaymentIntentId)
            .HasMaxLength(255);

        builder.Property(o => o.CreatedAt)
            .IsRequired();

        // Relationships

        builder.HasOne(o => o.Store)
            .WithMany()
            .HasForeignKey(o => o.StoreId)
            .OnDelete(DeleteBehavior.Restrict); // never cascade-delete order history if a store is removed

        builder.HasMany(o => o.Items)
            .WithOne(i => i.Order)
            .HasForeignKey(i => i.OrderId)
            .OnDelete(DeleteBehavior.Cascade); // deleting an order deletes its line items, that's fine

        // Indexes

        builder.HasIndex(o => o.StripeSessionId)
            .IsUnique(); // one order per checkout session, prevents duplicate order creation if webhook fires twice

        builder.HasIndex(o => new { o.StoreId, o.Status });

        builder.HasIndex(o => o.CreatedAt);
    }
}