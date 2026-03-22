/**
 * Mirrors `enum RoleCode` in `prisma/schema.prisma`.
 * Use this where IDE/tsconfig does not resolve `@prisma/client` enum exports reliably.
 */
export type RoleCode = "CUSTOMER" | "DELIVERY_AGENT" | "SUPER_ADMIN" | "STORE_OPERATOR";
