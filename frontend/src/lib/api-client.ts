export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export class ApiError extends Error {
  constructor(
    public status: number,
    public detail?: string,
    public errors?: Record<string, string[]>,
  ) {
    super(detail || "Request failed");
    this.name = "ApiError";
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

// A simple mutable variable to hold the short-lived access token in memory
let cachedAccessToken: string | null = null;

// Helper function to update the token from your login/social components
export function setAccessToken(token: string | null) {
  cachedAccessToken = token;
}

export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  // 1. Automatically attach the active Access Token if we have one in memory
  const headers = new Headers(options?.headers);

  // Only set Content-Type to JSON if the payload isn't FormData
  if (options?.body instanceof FormData) {
    headers.delete("Content-Type");
  } else if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (cachedAccessToken) {
    headers.set("Authorization", `Bearer ${cachedAccessToken}`);
  }

  // 2. Execute the initial request
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: "include",
  });

  // const isAuthEndpoint =
  //   endpoint === "/api/auth/refresh" ||
  //   endpoint.includes("/api/auth/login") ||
  //   endpoint.includes("/api/auth/social");

  // 3. INTERCEPT 401 UNAUTHORIZED (AccessToken Expired)
  // Ensure we don't intercept if the refresh endpoint itself is the one failing with a 401
  // if (response.status === 401 && !isAuthEndpoint) {
  //   try {
  //     // Call your backend refresh endpoint.
  //     // Note: The browser automatically includes the secure HttpOnly cookie behind the scenes!
  //     const refreshResponse = await fetch(`${API_URL}/api/auth/refresh`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       credentials: "include",
  //     });

  //     if (refreshResponse.ok) {
  //       const tokenData = await refreshResponse.json();

  //       // Save the new token into memory
  //       cachedAccessToken = tokenData.accessToken;

  //       if (updateSessionTrigger) {
  //         await updateSessionTrigger();
  //       }

  //       // Re-build headers and RETRY the original user request with the fresh key!
  //       headers.set("Authorization", `Bearer ${cachedAccessToken}`);

  //       if (options?.body instanceof FormData) {
  //         headers.delete("Content-Type");
  //       }

  //       response = await fetch(`${API_URL}${endpoint}`, {
  //         ...options,
  //         headers,
  //         credentials: "include",
  //       });
  //     } else {
  //       // If the refresh token is expired or deleted from DB, clear token and force logout route
  //       cachedAccessToken = null;
  //       if (typeof window !== "undefined") {
  //         window.location.href = "/lookup";
  //       }
  //     }
  //   } catch {
  //     cachedAccessToken = null;
  //     if (typeof window !== "undefined") {
  //       window.location.href = "/lookup";
  //     }
  //   }
  // }

  // 4. Parse the response body cleanly (matching your original logic)
  const text = await response.text();
  let data: any = {};
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { detail: text };
    }
  }

  if (!response.ok) {
    const fallbackMessage =
      response.status === 429
        ? "Rate limit exceeded. Please slow down."
        : data.detail;

    throw new ApiError(response.status, fallbackMessage, data.errors);
  }

  return data as T;
}
