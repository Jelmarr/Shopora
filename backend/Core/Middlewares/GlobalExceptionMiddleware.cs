using backend.Core.Exceptions;
using backend.Core.Exceptions.ValidatonException;
using Microsoft.AspNetCore.Diagnostics;

namespace backend.Core.Middlewares;

public sealed class GlobalExceptionHandler
    : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(
        HttpContext context,
        Exception exception,
        CancellationToken ct)
    {
        var statusCode = exception switch
        {
            ValidationException => StatusCodes.Status400BadRequest,

            NotFoundException => StatusCodes.Status404NotFound,

            ConflictException => StatusCodes.Status409Conflict,

            ForbiddenException => StatusCodes.Status403Forbidden,

            UnauthorizedAccessException =>
                StatusCodes.Status401Unauthorized,

            _ => StatusCodes.Status500InternalServerError
        };

        context.Response.StatusCode = statusCode;

        if (exception is ValidationException validationException)
        {
            await context.Response.WriteAsJsonAsync(new
            {
                title = "Validation Error",
                status = 400,
                errors = validationException.Errors
            }, ct);

            return true;
        }

        if (exception is FluentValidation.ValidationException fluentException)
        {
            var errorDictionary = fluentException.Errors
                .GroupBy(x => x.PropertyName)
                .ToDictionary(
                    g => g.Key,
                    g => g.Select(x => x.ErrorMessage).ToArray()
                );

            await context.Response.WriteAsJsonAsync(new
            {
                title = "Validation Error",
                status = 400,
                errors = errorDictionary
            }, ct);

            return true;
        }

        await context.Response.WriteAsJsonAsync(
            new
            {
                message = exception.Message
            },
            ct);

        return true;
    }
}