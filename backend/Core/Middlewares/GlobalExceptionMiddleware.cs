using backend.Core.Exceptions;
using FluentValidation;
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

        await context.Response.WriteAsJsonAsync(
            new
            {
                message = exception.Message
            },
            ct);

        return true;
    }
}