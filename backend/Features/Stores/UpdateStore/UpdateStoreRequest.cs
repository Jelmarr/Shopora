namespace backend.Features.Stores.UpdateStore;

public record UpdateStoreRequest
{
    public Guid Id { get; init; }
    public string Name { get; init; } = string.Empty;
    public string Slug { get; init; } = string.Empty;

    public IFormFile Logo { get; init; } = null!;
}
