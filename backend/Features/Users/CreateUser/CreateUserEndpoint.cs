using backend.Data;
using backend.Features.Stores.Models;
using backend.Features.Users.Models;
using FluentValidation;

namespace backend.Features.Users.CreateUser;

public static class CreateUserEndpoint
{
    public static void MapCreateUser(this IEndpointRouteBuilder app)
    {
        app.MapPost("api/user", async (CreateUserRequest request, IValidator<CreateUserRequest> validator, AppDbContext db) =>
        {

            var validationResult = await validator.ValidateAsync(request);
            if (!validationResult.IsValid) return Results.ValidationProblem(validationResult.ToDictionary());

            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(request.Password);

            var defaultStoreName = $"{request.FirstName} {request.LastName} Store";

            var newStore = new Store
            {
                StoreId = Guid.NewGuid(),
                Name = $"{defaultStoreName} Store",
                Slug = defaultStoreName.ToLower().Replace(" ", "-"),
                LogoUrl = string.Empty,
                CreatedAt = DateTime.UtcNow
            };

            var user = new User
            {
                Id = Guid.NewGuid(),
                StoreId = newStore.StoreId,
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = request.Email,
                Password = hashedPassword
            };

            db.Stores.Add(newStore);
            db.Users.Add(user);

            await db.SaveChangesAsync();

            var response = new CreateUserResponse(user.Id, user.FirstName, user.LastName, user.Email);
            return Results.Created($"/api/users/{user.Id}", response);

        })
        .WithTags("User");
    }
}