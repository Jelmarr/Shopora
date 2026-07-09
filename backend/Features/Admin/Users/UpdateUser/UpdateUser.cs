using FluentValidation;

namespace backend.Features.Admin.Users.UpdateUser;

public record UpdateUserRequest(string FirstName, string LastName, string Email, string Password);
public record UpdateUserResponse(Guid Id, string FirstName, string LastName, string Email, DateTime UpdatedAt);

public class UpdateUserValidator : AbstractValidator<UpdateUserRequest>
{
    public UpdateUserValidator()
    {
        RuleFor(x => x.FirstName)
        .NotEmpty().WithMessage("First name is required")
        .MinimumLength(3).WithMessage("First name required more than 3 characters")
        .MaximumLength(100).WithMessage("First name cannot exceed 100 characters");

        RuleFor(x => x.LastName)
        .NotEmpty().WithMessage("Last name is required")
        .MinimumLength(3).WithMessage("Last name required more than 3 characters")
        .MaximumLength(100).WithMessage("Last name cannot exceed 100 characters");

        RuleFor(x => x.Password)
       .NotEmpty().WithMessage("Password is required")
       .MinimumLength(8).WithMessage("Password require 8 characters or more")
       .MaximumLength(100).WithMessage("Password cannot exceed 100 characters");

        RuleFor(x => x.Email).EmailAddress();
    }
}