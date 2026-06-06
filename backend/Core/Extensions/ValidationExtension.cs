using FluentValidation;

namespace backend.Core.Extensions;

public static class ValidationExtension
{
    public static async Task ValidateOrThrowAsync<T>(
        this IValidator<T> validator,
        T model,
        CancellationToken ct)
    {
        var result =
            await validator.ValidateAsync(model, ct);

        if (!result.IsValid)
        {
            throw new ValidationException(result.Errors);
        }
    }
}