import type { ErrorRequestHandler } from "express";
import { env } from "../config/env.js";
import { ApiError } from "../lib/apiError.js";

/**
 * Last middleware: maps known errors to JSON; hides stack traces from clients in production.
 */
export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof ApiError) {
    res.status(err.status).json({ error: { code: err.code, message: err.message } });
    return;
  }

  if (env.NODE_ENV !== "production") {
    console.error(err);
  } else {
    console.error(err instanceof Error ? err.message : err);
  }

  res.status(500).json({
    error: {
      code: "INTERNAL_ERROR",
      message: "Unexpected error.",
      ...(env.NODE_ENV !== "production" && err instanceof Error
        ? { detail: err.message }
        : {}),
    },
  });
};
