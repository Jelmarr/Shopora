import { ApiError } from "./api-client";
import { notify } from "./toast";

export function getErrorMessage(error: unknown) {
  if (error instanceof ApiError) {
    return "Something went wrong. Please try again.";
  }

  return notify.error(
    "Connection Error",
    "Unable to connect to the server. Please try again.",
  );
}
