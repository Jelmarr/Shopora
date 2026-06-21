using backend.Core.Configurations;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Options;

namespace backend.Features.Products.Services;

public class CloudinaryUploadResult
{
    public string Url { get; set; } = string.Empty;
    public string PublicId { get; set; } = string.Empty;
}

public class CloudinaryService : ICloudinaryService
{
    private readonly Cloudinary _cloudinary;

    public CloudinaryService(IOptions<CloudinarySettings> settings)
    {
        var account = new Account(
                settings.Value.CloudName,
                settings.Value.ApiKey,
                settings.Value.SecretKey);

        _cloudinary = new Cloudinary(account);
    }

    public async Task<CloudinaryUploadResult> UploadImageAsync(IFormFile file, string folder)
    {
        await using var stream = file.OpenReadStream();

        var uploadParams = new ImageUploadParams
        {
            File = new FileDescription(
                file.FileName,
                stream
            ),

            Folder = folder
        };

        var result = await _cloudinary.UploadAsync(uploadParams);

        return new CloudinaryUploadResult
        {
            Url = result.SecureUrl.ToString(),
            PublicId = result.PublicId
        };
    }

    public async Task DeleteImageAsync(string publicId)
    {
        var deleteParams = new DeletionParams(publicId);
        await _cloudinary.DestroyAsync(deleteParams);
    }
}

