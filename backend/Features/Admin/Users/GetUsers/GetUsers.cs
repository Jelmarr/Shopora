namespace backend.Features.Admin.Users.GetUsers;

public record GetUsersResponse
{
    public Guid Id { get; init; }
    public string FirstName { get; init; } = string.Empty;
    public string LastName { get; init; } = string.Empty;
    public string Email { get; init; } = string.Empty;
    public string Slug { get; init; } = string.Empty;
}

