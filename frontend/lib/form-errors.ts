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

  if (error.errors) {
    Object.entries(error.errors).forEach(([field, messages]) => {
      setError(field as Path<T>, {
        type: "server",
        message: (messages as string[])[0],
      });
    });
  }

  switch (error.status) {
    case 401:
      notify.error("Unauthorized", "Please try again later.");
      break;

    case 403:
      notify.error(
        "Forbidden",
        "You do not have permission to perform this action.",
      );
      break;

    case 500:
      notify.error(
        "Server Error",
        "Something went wrong. Please try again later.",
      );
      break;
  }
}
