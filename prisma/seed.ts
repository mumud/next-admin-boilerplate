import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const db = new PrismaClient();

async function createRole() {
    return await db.role.create({
        data: {
            name: "Administrator",
        },
    });
}

async function createUser() {
    // get role
    let role = await db.role.findFirst({
        where: {
            name: "Administrator",
        },
    });

    if (!role) {
        role = await createRole();
    }

    const password = await hash("password", 12);
    await db.user.create({
        data: {
            name: "Administrator",
            email: "admin@devpintar.com",
            username: "admin",
            password,
            role: {
                connect: {
                    id: role?.id,
                },
            },
            isVerified: true,
        },
    });
}

async function main() {
    await createRole();
    await createUser();
}
main()
    .then(() => db.$disconnect())
    .catch(async (e) => {
        console.error(e);
        await db.$disconnect();
        process.exit(1);
    });