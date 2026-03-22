import { prisma } from "../../lib/prisma.js";
import type { RoleCode } from "../../types/roleCode.js";

export type UserWithRoles = Awaited<ReturnType<typeof createUserWithPhoneAndRole>>;

/**
 * Persistence only — no HTTP or domain error mapping.
 */
export async function createUserWithPhoneAndRole(params: {
  phone: string;
  name: string | null;
  role: RoleCode;
}) {
  return prisma.user.create({
    data: {
      phone: params.phone,
      name: params.name,
      email: null,
      roles: {
        create: [{ role: params.role }],
      },
    },
    include: { roles: { select: { role: true } } },
  });
}
