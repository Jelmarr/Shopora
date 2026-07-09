using FluentValidation;

namespace backend.Features.Admin.Stores.UpdateStore;

public class UpdateStoreValidator : AbstractValidator<UpdateStoreRequest>
{
    public UpdateStoreValidator()
    {
        RuleFor(store => store.Name)
            .NotEmpty()
            .WithMessage("Store Name is required.")
            .MaximumLength(255);

        RuleFor(store => store.Slug)
            .NotEmpty()
            .WithMessage("Slug is required.")
            .MaximumLength(255);

        RuleFor(store => store.Logo)
            .Cascade(CascadeMode.Stop)
            .NotNull().WithMessage("Store logo file is required.")

            .Must(file => file.Length <= 5 * 1024 * 1024)
            .WithMessage((_, file) => $"The logo '{file.FileName}' exceeds the 5MB size limit.")

            .Must(file => file.ContentType == "image/jpeg" ||
                          file.ContentType == "image/png" ||
                          file.ContentType == "image/webp")
            .WithMessage((_, file) => $"The logo '{file.FileName}' must be a JPG, PNG, or WEBP format.");
    }
}