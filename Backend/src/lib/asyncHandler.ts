import type { RequestHandler } from "express";

/**
 * Wraps an async Express handler so rejected promises and thrown errors reach `next(err)`
 * and the centralized error middleware.
 */
export function asyncHandler(fn: RequestHandler): RequestHandler {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
