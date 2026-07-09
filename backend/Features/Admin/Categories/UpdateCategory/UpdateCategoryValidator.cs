using backend.Features.Admin.Categories.UpdateCategory;
using FluentValidation;

public class UpdateCategoryValidator : AbstractValidator<UpdateCategoryRequest>
{
    public UpdateCategoryValidator()
    {
        RuleFor(x => x.Name)
           .NotEmpty()
           .WithMessage("Category name is required.")
           .MaximumLength(255);
    }
}