using backend.Data;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace backend.Features.Admin.Users.UpdateUser;

public static class UpdateUserEndpoint
{
    public static void MapUpdateUser(this IEndpointRouteBuilder app)
    {
        app.MapPut("/api/users/{id:int}", async (
            Guid id,
            UpdateUserRequest request,
            IValidator<UpdateUserRequest> validator,
            AppDbContext db) =>
        {

            var validationResult = await validator.ValidateAsync(request);
            if (!validationResult.IsValid) return Results.ValidationProblem(validationResult.ToDictionary());


            var user = await db.Users.FirstOrDefaultAsync(user => user.Id == id);

            if (user is null)
            {
                return Results.NotFound(new { message = $"User with ID {id} was not found" });
            }

            user.FirstName = request.FirstName;
            user.LastName = request.LastName;
            user.Email = request.Email;

            await db.SaveChangesAsync();

            var response = new UpdateUserResponse(
                user.Id,
                user.FirstName,
                user.LastName,
                user.Email,
                DateTime.UtcNow
            );

            return Results.Ok(response);
        })
        .WithTags("User");
    }
}