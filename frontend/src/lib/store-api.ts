import { API_URL, ApiError } from "./api-client";

export async function storeApiFetch<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const headers = new Headers(options?.headers);

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

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
          : data.detail || "An error occurred";

      throw new ApiError(response.status, fallbackMessage, data.errors);
    }

    return data as T;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw error;
    }
    throw error;
  }
}
