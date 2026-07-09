using backend.Features.Admin.Stores.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace backend.Features.Admin.Stores.Configures;

public class StoresConfiguration : IEntityTypeConfiguration<Store>
{
    public void Configure(EntityTypeBuilder<Store> builder)
    {

        builder.ToTable("Stores");

        builder.HasKey(s => s.StoreId);

        builder.Property(s => s.Name)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(s => s.Slug)
            .HasMaxLength(120);

        builder.Property(s => s.LogoUrl)
            .HasMaxLength(500);

        builder.Property(s => s.LogoPublicId)
            .HasMaxLength(250);

        builder.HasIndex(s => s.Slug)
            .IsUnique();

        builder.HasIndex(s => s.Name)
            .HasMethod("gin")
            .HasOperators("gin_trgm_ops");
    }
}