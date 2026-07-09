namespace backend.Features.Admin.Stores.GetStores;

public record GetStoresResponse
{
    public Guid Id { get; init; }
    public string Name { get; init; } = string.Empty;
    public string LogoUrl { get; init; } = string.Empty;
    public string Slug { get; init; } = string.Empty;
}