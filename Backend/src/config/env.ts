function parsePort(value: string | undefined, fallback: number): number {
  if (value === undefined || value === "") return fallback;
  const n = Number(value);
  if (!Number.isFinite(n) || n < 1) return fallback;
  return n;
}

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  PORT: parsePort(process.env.PORT, 4000),
  /** Required for `prisma migrate` / runtime DB access; optional for a bare HTTP smoke test. */
  DATABASE_URL: process.env.DATABASE_URL,
} as const;
