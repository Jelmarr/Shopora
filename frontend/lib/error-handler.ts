import { ApiError } from "./api-client";

export function getErrorMessage(error: unknown) {
  if (error instanceof ApiError) {
    console.error(error.detail);

    return "Something went wrong. Please try again.";
  }

  return "Unable to connect to the server.";
}
