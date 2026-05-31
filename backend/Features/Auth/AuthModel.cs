namespace backend.Features.Auth;

public record LoginRequest(string Email, string Password);
public record AuthResponse(string AccessToken, string Email, string Role);
