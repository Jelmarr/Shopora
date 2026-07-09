namespace backend.Features.Admin.Products.Services;

public interface ICloudinaryService
{
    Task<CloudinaryUploadResult> UploadImageAsync(IFormFile file, string folder);
    Task DeleteImageAsync(string publicId);
}
