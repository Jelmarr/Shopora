using FluentValidation;

namespace backend.Features.Admin.Users.CreateUser;

public record CreateUserRequest(string FirstName, string LastName, string Email, string Password);
public record CreateUserResponse(Guid Id, string FirstName, string LastName, string Email);

public class CreateUserValidator : AbstractValidator<CreateUserRequest>
{
    public CreateUserValidator()
    {
        RuleFor(x => x.FirstName)
        .NotEmpty().WithMessage("First name is required")
        .MinimumLength(3).WithMessage("First name must be at least 3 characters")
        .MaximumLength(100).WithMessage("First name cannot exceed 100 characters");

        RuleFor(x => x.LastName)
        .NotEmpty().WithMessage("Last name is required")
        .MinimumLength(3).WithMessage("Last name must be at least 3 characters")
        .MaximumLength(100).WithMessage("Last name cannot exceed 100 characters");

        RuleFor(x => x.Password)
        .NotEmpty().WithMessage("Password is required")
        .MinimumLength(8).WithMessage("Password must be at least 8 characters")
        .MaximumLength(100).WithMessage("Password cannot exceed 100 characters");

        RuleFor(x => x.Email).EmailAddress();
    }
}