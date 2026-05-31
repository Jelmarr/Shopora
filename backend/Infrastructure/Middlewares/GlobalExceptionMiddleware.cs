using System.Net;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

namespace backend.Core.Middlewares;

public class GlobalExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<GlobalExceptionMiddleware> _logger;
    private readonly IHostEnvironment _env;

    public GlobalExceptionMiddleware(RequestDelegate next, ILogger<GlobalExceptionMiddleware> logger, IHostEnvironment env)
    {
        _next = next;
        _logger = logger;
        _env = env;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            // Forward the request down the pipeline to the next middleware or endpoint
            await _next(context);
        }
        catch (Exception ex)
        {

            Console.WriteLine($"====== GLOBAL CRASH DETECTED ======");
            Console.WriteLine(ex.ToString());
            Console.WriteLine($"====================================");
            // Catch ANY unhandled crash from down the line, log it, and format the response
            _logger.LogError(ex, "Unhandled Exception: {Message} on Path: {Path}", ex.Message, context.Request.Path);
            await HandleExceptionAsync(context, ex);
        }
    }

    private Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError; // 500 Internal Error

        // Create an RFC 7807 compliant error structure
        var problemDetails = new ProblemDetails
        {
            Status = context.Response.StatusCode,
            Type = "https://tools.ietf.org/html/rfc7231#section-6.6.1",
            Title = "An unexpected server error occurred.",
            Instance = context.Request.Path,
            // Show the exact stack trace ONLY during local development
            Detail = _env.IsDevelopment()
                ? exception.ToString()
                : "An internal error occurred. Please try again later or contact support."
        };

        // Serialize into camelCase so JavaScript can read it cleanly
        var jsonOptions = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        };

        var jsonResponse = JsonSerializer.Serialize(problemDetails, jsonOptions);

        return context.Response.WriteAsync(jsonResponse);
    }
}