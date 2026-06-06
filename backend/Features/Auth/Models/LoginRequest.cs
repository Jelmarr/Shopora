namespace backend.Features.Auth.Models;

public record AuthResponse(string AccessToken, string Email, string Role);
