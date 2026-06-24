using backend.Features.Categories.CreateCategories;
using FluentValidation;

public class CreateCategoryValidator : AbstractValidator<CreateCategoryRequest>
{
    public CreateCategoryValidator()
    {
        RuleFor(x => x.Name)
           .NotEmpty()
           .WithMessage("Category name is required.")
           .MaximumLength(255);
    }
}