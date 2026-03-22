import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().int().min(1).max(65535).default(4000),
  /** Optional until every process needs DB access (e.g. health-only scripts). */
  DATABASE_URL: z.string().min(1).optional(),
  MOBILE_USER_CREATE_REQUIRE_OTP: z
    .string()
    .optional()
    .transform((v) => v === "true"),
  /**
   * Comma-separated allowlist, or `*` to reflect request origin in development-style setups.
   * Production should set explicit origins; `credentials: true` is incompatible with literal `*`.
   */
  CORS_ORIGIN: z.string().default("*"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment variables:", parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;
