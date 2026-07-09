using backend.Features.Admin.Users.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace backend.Features.Users.Configures;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {

        builder.ToTable("Users");

        builder.HasKey(u => u.Id);

        builder.Property(u => u.FirstName)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(u => u.LastName)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(u => u.Email)
            .HasMaxLength(150)
            .IsRequired();

        builder.Property(u => u.Role)
            .HasConversion<string>()
            .HasMaxLength(30)
            .IsRequired();

        builder.Property(u => u.Password)
            .HasMaxLength(255)
            .IsRequired();

        builder.Property(u => u.RefreshToken)
            .HasMaxLength(500);

        builder.HasOne(u => u.Store)
            .WithMany()
            .HasForeignKey(u => u.StoreId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasIndex(u => u.StoreId);

        builder.HasIndex(u => u.Email)
            .IsUnique();

        builder.HasIndex(c => c.FirstName)
            .HasMethod("gin")
            .HasOperators("gin_trgm_ops");

        builder.HasIndex(c => c.LastName)
            .HasMethod("gin")
            .HasOperators("gin_trgm_ops");
    }
}