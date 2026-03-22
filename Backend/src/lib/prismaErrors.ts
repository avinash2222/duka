/**
 * Detect Prisma unique constraint violations without importing runtime error classes
 * (keeps persistence layer decoupled from @prisma/client internals).
 */
export function isPrismaUniqueViolation(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code: string }).code === "P2002"
  );
}
