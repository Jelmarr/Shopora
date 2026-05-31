const API_URL = process.env.NEXT_PUBLIC_API_URL;

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

export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  const text = await response.text();

  // Safely try to parse it as JSON if text exists
  let data: any = {};
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      // If it's not JSON (like a plain string), keep it as detail text
      data = { detail: text };
    }
  }

  if (!response.ok) {
    throw new ApiError(response.status, data.detail, data.errors);
  }

  return data;
}
