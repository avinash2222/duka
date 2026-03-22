import "dotenv/config";
import { PrismaClient, RoleCode } from "@prisma/client";

const prisma = new PrismaClient();

/** Default platform super admin — idempotent (safe to re-run). */
const DEFAULT_SUPER_ADMIN_EMAIL = "avinashcat.singh@gmail.com";

async function main() {
  await prisma.$transaction(async (tx) => {
    let user = await tx.user.findUnique({ where: { email: DEFAULT_SUPER_ADMIN_EMAIL } });

    if (!user) {
      user = await tx.user.create({
        data: {
          email: DEFAULT_SUPER_ADMIN_EMAIL,
          name: "Super Admin",
          phone: null,
          roles: {
            create: [{ role: RoleCode.SUPER_ADMIN }],
          },
        },
      });
      console.log(`[seed] Created super admin user: ${user.id} (${DEFAULT_SUPER_ADMIN_EMAIL})`);
      return;
    }

    const existingRole = await tx.userRole.findUnique({
      where: {
        userId_role: { userId: user.id, role: RoleCode.SUPER_ADMIN },
      },
    });

    if (!existingRole) {
      await tx.userRole.create({
        data: { userId: user.id, role: RoleCode.SUPER_ADMIN },
      });
      console.log(`[seed] Added SUPER_ADMIN role to existing user: ${user.id}`);
      return;
    }

    console.log(`[seed] Super admin already present: ${user.id} (${DEFAULT_SUPER_ADMIN_EMAIL})`);
  });
}

main()
  .catch((e) => {
    console.error("[seed] Failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
