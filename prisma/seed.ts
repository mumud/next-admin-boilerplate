import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const db = new PrismaClient();

async function createRole(name: string) {
    return await db.role.create({
        data: {
            name,
        },
    });
}

async function createUser() {
    // get role admin
    const roleAdmin = await db.role.findFirst({
        where: {
            name: "Administrator",
        },
    });

    if (!roleAdmin) return;

    const password = await hash("password", 12);
    await db.user.create({
        data: {
            name: "Administrator",
            email: "admin@devpintar.com",
            username: "admin",
            password,
            role: {
                connect: {
                    id: roleAdmin?.id,
                },
            },
            isVerified: true,
        },
    });

    // get role user
    const roleUser = await db.role.findFirst({
        where: {
            name: "User",
        },
    });

    if (!roleUser) return;

    const users = [];
    for (let i = 1; i <= 200; i++) {
        users.push({
          name: `User${i}`,
          email: `user${i}@devpintar.com`,
          username: `user${i}`,
          password,
          role: {
            connect: {
              id: roleUser?.id, // Sesuaikan dengan id role yang diinginkan
            },
          },
          isVerified: true,
        });
      }
  
      await Promise.all(users.map(user => db.user.create({ data: user })));
  
      console.log('200 dummy users created successfully');
}

async function main() {
    await db.user.deleteMany()
    await db.role.deleteMany()

    await createRole("Administrator");
    await createRole("User");
    await createUser();
}
main()
    .then(() => db.$disconnect())
    .catch(async (e) => {
        console.error(e);
        await db.$disconnect();
        process.exit(1);
    });