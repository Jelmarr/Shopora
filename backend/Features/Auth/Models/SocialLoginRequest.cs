namespace backend.Features.Auth.Models;

public record SocialLoginRequest(string Email, string FirstName, string LastName, string Provider);
