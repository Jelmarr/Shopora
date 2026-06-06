using Microsoft.AspNetCore.RateLimiting;

namespace backend.Features.Auth;

public static class AuthRateLimitPolicies
{
    public const string StrictAuthPolicy = "StrictAuthPolicy";

    public static IServiceCollection AddAuthRateLimiting(this IServiceCollection services)
    {
        services.AddRateLimiter(options =>
        {
            // Return a clean HTTP 429 when limits are breached
            options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;

            // Token Bucket Algorithm: Perfect for smooth login security
            options.AddTokenBucketLimiter(StrictAuthPolicy, bucketOptions =>
            {
                bucketOptions.TokenLimit = 5;          // Maximum pool capacity is 5 tokens
                bucketOptions.TokensPerPeriod = 1;     // Restore 1 token...
                bucketOptions.ReplenishmentPeriod = TimeSpan.FromSeconds(12); // ...every 12 seconds (5 per minute)
                bucketOptions.QueueLimit = 0;          // Fail instantly if the bucket is empty
            });
        });

        return services;
    }
}