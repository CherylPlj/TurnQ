import { PrismaClient, Role } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

const DEFAULT_SUPER_ADMIN = {
  fullName: "Sarah Jane",
  email: "sjsfihrms@gmail.com",
  password: "SuperStrongPass123.",
  role: Role.ADMIN,
};

async function main() {
  const passwordHash = await hash(DEFAULT_SUPER_ADMIN.password, 12);

  const user = await prisma.user.upsert({
    where: { email: DEFAULT_SUPER_ADMIN.email },
    update: {
      fullName: DEFAULT_SUPER_ADMIN.fullName,
      passwordHash,
      role: DEFAULT_SUPER_ADMIN.role,
    },
    create: {
      email: DEFAULT_SUPER_ADMIN.email,
      fullName: DEFAULT_SUPER_ADMIN.fullName,
      passwordHash,
      role: DEFAULT_SUPER_ADMIN.role,
    },
    select: {
      id: true,
      email: true,
      fullName: true,
      role: true,
    },
  });

  console.log(`Default super admin ready: ${user.fullName} <${user.email}> [${user.role}]`);
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
