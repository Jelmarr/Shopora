using FluentValidation;

namespace backend.Features.Users.UpdateUser;

public record UpdateUserRequest(string FirstName, string LastName, string Email);
public record UpdateUserResponse(int Id, string FirstName, string LastName, string Email, DateTime UpdatedAt);

public class UpdateUserValidator : AbstractValidator<UpdateUserRequest>
{
    public UpdateUserValidator()
    {
        RuleFor(x => x.FirstName)
        .NotEmpty().WithMessage("First name is required")
        .MinimumLength(3).WithMessage("First name required more than 3 characters")
        .MaximumLength(100).WithMessage("First name cannot exceed 100 characters");

        RuleFor(x => x.LastName)
        .NotEmpty().WithMessage("First name is required")
        .MinimumLength(3).WithMessage("First name required more than 3 characters")
        .MaximumLength(100).WithMessage("First name cannot exceed 100 characters");

        RuleFor(x => x.Email).EmailAddress();
    }
}