import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import { faker } from '@faker-js/faker';

const db = new PrismaClient();

async function createMenu() {
    // create main menu
    await db.menu.createMany({
        data: [
            {
                name: 'Dashbaord',
                icon: 'icon-dashboard',
                path: '/',
                order: 1,
            },
            {
                name: 'Master Data',
                icon: 'icon-database',
                path: '/master-datas',
                order: 2,
            },
            {
                name: 'Settings',
                icon: 'icon-settings',
                path: '/settings',
                order: 2,
            }
        ]
    })

    // create sub menu
    const settingMenu = await db.menu.findFirst({where: {
        name: 'Settings'
    }})
    if(settingMenu) {
        await db.menu.createMany({
            data: [
                {
                    name: 'General',
                    icon: 'icon-adjusment-horizontal',
                    path: '/settings/general',
                    order: 1,
                    parent_id: settingMenu.id
                },
                {
                    name: 'Menu',
                    icon: 'icon-menu',
                    path: '/settings/menus',
                    order: 2,
                    parent_id: settingMenu.id
                },
                {
                    name: 'Permissions',
                    icon: 'icon-shiled-check',
                    path: '/settings/permissions',
                    order: 3,
                    parent_id: settingMenu.id
                },
                {
                    name: 'User Role',
                    icon: 'icon-shiled-cog',
                    path: '/settings/roles',
                    order: 5,
                    parent_id: settingMenu.id
                },
                {
                    name: 'User Management',
                    icon: 'icon-user-cog',
                    path: '/settings/users',
                    order: 5,
                    parent_id: settingMenu.id
                },
            ]
        })
    }
}

async function createRole(name: string) {
    const role = await db.role.create({
        data: {
            name,
        },
    });

    // create role menu
    if(role.name === 'Administrator') {
        const allMenus = await db.menu.findMany()
        await Promise.all(allMenus.map(async menu => {
            await db.roleMenu.create({
                data: {
                    roleId: role.id,
                    menuId: menu.id
                }
            })
        }))
    } else {
        const menus = await db.menu.findMany({
            where: {
                path: {
                    not: {
                        contains: '/settings'
                    }
                }
            }
        })
        await Promise.all(menus.map(async menu => {
            await db.roleMenu.create({
                data: {
                    roleId: role.id,
                    menuId: menu.id
                }
            })
        }))
    }
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
            username: "admin",
            name: "Administrator",
            email: "admin@devpintar.com",
            phoneNumber: faker.phone.number(),
            image: faker.image.avatar(),
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
            username: `user${i}`,
            name: faker.person.fullName(),
            email: faker.internet.email(),
            phoneNumber: faker.phone.number(),
            image: faker.image.avatar(),
            password,
            role: {
                connect: {
                    id: roleUser?.id,
                },
            },
            isVerified: true,
        });
    }

    await Promise.all(users.map(user => db.user.create({ data: user })));

    console.log('200 dummy users created successfully');
}

async function main() {
    await db.menu.deleteMany()
    await db.user.deleteMany()
    await db.role.deleteMany()

    await createMenu()
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