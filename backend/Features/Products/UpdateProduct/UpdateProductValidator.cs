using FluentValidation;

namespace backend.Features.Products.UpdateProduct;

public class UpdateProductValidator : AbstractValidator<UpdateProductRequest>
{
    public UpdateProductValidator()
    {
        RuleFor(x => x.Name)
           .NotEmpty()
           .WithMessage("Product name is required.")
           .MaximumLength(255);

        RuleFor(x => x.SKU)
            .NotEmpty()
            .WithMessage("SKU is required.")
            .MaximumLength(100);

        RuleFor(x => x.CategoryId)
            .NotEmpty()
            .WithMessage("Category is required.");

        RuleFor(x => x.Description)
            .NotEmpty()
            .WithMessage("Description is required.")
            .MaximumLength(2000);

        RuleFor(x => x.Price)
            .GreaterThan(0)
            .WithMessage("Price must be greater than 0.");

        RuleFor(x => x.CompareAtPrice)
            .GreaterThan(0)
            .When(x => x.CompareAtPrice.HasValue)
            .WithMessage("Compare at price must be greater than 0.");

        RuleFor(x => x.CompareAtPrice)
            .GreaterThan(x => x.Price)
            .When(x => x.CompareAtPrice.HasValue)
            .WithMessage("Compare at price must be greater than the selling price.");

        RuleFor(x => x.CostPrice)
            .GreaterThanOrEqualTo(0)
            .When(x => x.CostPrice.HasValue)
            .WithMessage("Cost price cannot be negative.");

        RuleFor(x => x.Stock)
            .GreaterThanOrEqualTo(0)
            .WithMessage("Stock cannot be negative.");

        RuleFor(x => x.LowStockThreshold)
            .GreaterThanOrEqualTo(0)
            .WithMessage("Low stock threshold cannot be negative.");

        RuleFor(x => x.Status)
            .IsInEnum()
            .WithMessage("Invalid product status.");

        RuleFor(x => x.Images)
            .NotEmpty()
            .WithMessage("At least one product image is required.");

        RuleForEach(x => x.Images)
            .ChildRules(image =>
            {
                image.RuleFor(file => file)
                    .Must(file => file.Length <= 5 * 1024 * 1024)
                    .WithMessage((_, file) => $"Image '{file.FileName}' exceeds the 5MB size limit.");

                image.RuleFor(file => file)
                    .Must(file => file.ContentType == "image/jpeg" ||
                                  file.ContentType == "image/png" ||
                                  file.ContentType == "image/webp")
                    .WithMessage((_, file) => $"Image '{file.FileName}' must be a JPG, PNG, or WEBP format.");
            });
    }
}