namespace backend.Features.Products.Services;

public interface ICloudinaryService
{
    Task<CloudinaryUploadResult> UploadImageAsync(IFormFile file);
    Task DeleteImageAsync(string publicId);
}
