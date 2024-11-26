export const validateString = (
  value: unknown,
  maxLength: number
): value is string => {
  if (!value || typeof value !== "string" || value.length > maxLength) {
    return false;
  }

  return true;
};

export const getErrorMessage = (error: unknown): string => {
  let message: string;
  // Not Error but other object
  if (
    error &&
    typeof error === "object" &&
    "statusCode" in error &&
    typeof (error as any).statusCode === "number"
  ) {
    const err = error as { statusCode: number; message?: string };
    return err.message || `Error with status code ${err.statusCode}`;
  }

  // Error
  if (error instanceof Error) {
    message = error.message;
  } else if (
    error &&
    typeof error === "object" &&
    "message" in error &&
    "name" in error &&
    "statusCode" in error
  ) {
    const err = error as { message: string; name: string; statusCode: number };
    message = `[${err.statusCode}] ${err.name}: ${err.message}`;
  } else if (error && typeof error === "object" && "message" in error) {
    message = String((error as any).message);
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "Something went wrong";
  }

  return message;
};

