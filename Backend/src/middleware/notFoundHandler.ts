import type { RequestHandler } from "express";

/**
 * Place immediately after all routes so unknown paths return a consistent JSON 404.
 */
export const notFoundHandler: RequestHandler = (req, res) => {
  res.status(404).json({
    error: {
      code: "NOT_FOUND",
      message: `No route for ${req.method} ${req.originalUrl}`,
    },
  });
};
