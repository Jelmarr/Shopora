using backend.Features.Stores.Models;

namespace backend.Features.Users.Models
{
    public class User
    {
        public Guid Id { get; set; }
        public Guid StoreId { get; set; }
        public required string FirstName { get; set; } = string.Empty;
        public required string LastName { get; set; } = string.Empty;
        public required string Email { get; set; } = string.Empty;
        public string Role { get; set; } = "Owner";
        public string? RefreshToken { get; set; }
        public DateTime? RefreshTokenExpiry { get; set; }
        public string Password { get; set; } = string.Empty;
        public bool IsVerified { get; set; } = false;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public Store Store { get; set; } = null!;
    }
}
