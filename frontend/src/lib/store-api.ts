import { API_URL, ApiError } from "./api-client";

interface StoreApiErrorPayload {
  detail?: string;
  errors?: Record<string, string[]>;
  [key: string]: unknown;
}

export async function storeApiFetch<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const headers = new Headers(options?.headers);

  // Set default JSON Content-Type unless payload is FormData or custom header exists
  if (options?.body instanceof FormData) {
    headers.delete("Content-Type");
  } else if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  let response: Response;

  try {
    response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });
  } catch (error) {
    // Re-throw AbortError or network failure directly without wrapping
    throw error;
  }

  const text = await response.text();
  let data: StoreApiErrorPayload = {};

  if (text) {
    try {
      data = JSON.parse(text) as StoreApiErrorPayload;
    } catch {
      data = { detail: text };
    }
  }

  if (!response.ok) {
    const fallbackMessage =
      response.status === 429
        ? "Rate limit exceeded. Please slow down."
        : data.detail || `Request failed with status ${response.status}`;

    throw new ApiError(response.status, fallbackMessage, data.errors);
  }

  return data as T;
}
