import cors from "cors";
import express from "express";
import helmet from "helmet";
import { env } from "./config/env.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { healthRouter } from "./routes/health.js";
import { v1Router } from "./routes/v1/index.js";

function corsOptions(): cors.CorsOptions {
  const raw = env.CORS_ORIGIN.trim();
  if (raw === "*") {
    return { origin: true, credentials: true };
  }
  const list = raw
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean);
  return { origin: list.length ? list : true, credentials: true };
}

export function createApp() {
  const app = express();
  app.disable("x-powered-by");
  app.use(helmet());
  app.use(cors(corsOptions()));
  app.use(express.json({ limit: "1mb" }));

  app.use("/health", healthRouter);
  app.use("/v1", v1Router);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
