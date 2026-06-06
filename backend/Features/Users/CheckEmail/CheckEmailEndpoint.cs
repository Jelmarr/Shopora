using backend.Data;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace backend.Features.Users.CheckEmail;

public class CheckEmailRequestValidator : AbstractValidator<string>
{
    public CheckEmailRequestValidator()
    {
        RuleFor(email => email)
            .NotEmpty().WithMessage("Email address is required.")
            .EmailAddress().WithMessage("Please enter a valid email address structure (e.g., user@example.com).")
            .MaximumLength(256).WithMessage("Email address cannot exceed 256 characters.");
    }
}
public static class CheckEmailEndpoint
{
    public static void MapCheckEmail(this IEndpointRouteBuilder app)
    {
        app.MapGet("api/user/check-email", async (string email, AppDbContext db) =>
        {

            var validator = new CheckEmailRequestValidator();
            var validationResult = await validator.ValidateAsync(email);

            if (!validationResult.IsValid)
            {
                return Results.ValidationProblem(validationResult.ToDictionary());
            }

            var targetEmail = email.Trim().ToLower();

            bool exists = await db.Users.AnyAsync(user => user.Email.ToLower() == targetEmail);

            return Results.Ok(new
            {
                isExisting = exists,
                email = targetEmail
            });
        })
        .WithTags("User");
    }
}