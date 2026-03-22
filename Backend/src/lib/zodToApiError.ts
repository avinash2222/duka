import type { ZodError } from "zod";
import { ApiError } from "./apiError.js";

/**
 * Maps Zod validation failures to stable API error responses.
 * Mobile user creation uses `.strict()` schemas; unknown `email` maps to EMAIL_NOT_ALLOWED.
 */
export function zodErrorToApiError(error: ZodError): ApiError {
  for (const issue of error.issues) {
    if (issue.code === "unrecognized_keys") {
      const keys = "keys" in issue && Array.isArray((issue as { keys: string[] }).keys)
        ? (issue as { keys: string[] }).keys
        : [];
      if (keys.includes("email")) {
        return new ApiError(
          400,
          "EMAIL_NOT_ALLOWED",
          "Email is not allowed on the mobile user creation path.",
        );
      }
      return new ApiError(400, "VALIDATION_ERROR", `Unknown fields: ${keys.join(", ")}`);
    }
  }

  const first = error.issues[0];
  const pathPrefix = first?.path.length ? `${first.path.join(".")}: ` : "";
  return new ApiError(
    400,
    "VALIDATION_ERROR",
    `${pathPrefix}${first?.message ?? "Validation failed"}`,
  );
}
