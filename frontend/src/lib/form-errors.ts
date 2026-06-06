import { FieldValues, Path, UseFormSetError } from "react-hook-form";
import { ApiError } from "./api-client";
import { notify } from "./toast";

export function handleFormError<T extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<T>,
) {
  if (!(error instanceof ApiError)) {
    notify.error(
      "Connection Error",
      "Unable to connect to the server. Please try again.",
    );
    return;
  }

  const isValidationError = error.status === 400 || error.status === 422;

  if (isValidationError && error.errors) {
    Object.entries(error.errors).forEach(([field, messages]) => {
      setError(field as Path<T>, {
        type: "server",
        message: (messages as string[])[0],
      });
    });
  }

  switch (error.status) {
    case 401:
      notify.error("Unauthorized", error.message || "Please login again.");
      break;

    case 403:
      notify.error(
        "Forbidden",
        "You do not have permission to perform this action.",
      );
      break;

    case 429:
      notify.error(
        "Too Many Requests",
        error.message ||
          "You are doing that too fast. Please wait a minute and try again.",
      );
      break;

    case 500:
      notify.error(
        "Server Error",
        "Something went wrong on our end. Please try again later.",
      );
      break;

    default:
      if (!isValidationError) {
        notify.error(
          "Request Failed",
          error.message || "An unexpected error occurred.",
        );
      }
      break;
  }
}
