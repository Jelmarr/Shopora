using FluentValidation;

namespace backend.Features.Users.CreateUser;

public record CreateUserRequest(string FirstName, string LastName, string Email, string Password);
public record CreateUserResponse(int Id, string FirstName, string LastName, string Email);

public class CreateUserValidator : AbstractValidator<CreateUserRequest>
{
    public CreateUserValidator()
    {
        RuleFor(x => x.FirstName)
        .NotEmpty().WithMessage("First name is required")
        .MinimumLength(3).WithMessage("First name required more than 3 characters")
        .MaximumLength(100).WithMessage("First name cannot exceed 100 characters");

        RuleFor(x => x.LastName)
        .NotEmpty().WithMessage("First name is required")
        .MinimumLength(3).WithMessage("First name required more than 3 characters")
        .MaximumLength(100).WithMessage("First name cannot exceed 100 characters");

        RuleFor(x => x.Password)
        .NotEmpty().WithMessage("Password is required")
        .MinimumLength(8).WithMessage("Password should contain 8 characters or more")
        .MaximumLength(100).WithMessage("Password should not contain 100 characters or more");

        RuleFor(x => x.Email).EmailAddress();
    }
}