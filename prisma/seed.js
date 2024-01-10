const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Test Seed data for Users
async function users() {
    const test = await prisma.users.upsert({
        where: { email: 'test@gamil.com' },
        update: {},
        create: {
            email: 'test@gamil.com',
            name: 'Test',
            userInventory: {
                create: {
                    item: 'testItem',
                }
            },
        },
    })
    console.log({ test });
}

// Test Seed data for inventory
users()
.then(async () => {
    await prisma.$disconnect()
})
.catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
})

async function items() {
    const test = await prisma.inventory.upsert({
        where: { email: 'test@gamil.com' },
        update: {},
        create: {
            email: 'test@gamil.com',
            name: 'Test',
            userInventory: {
                create: {
                    item: 'testItem',
                }
            },
        },
    })
    console.log({ test });
}

items()
.then(async () => {
    await prisma.$disconnect()
})
.catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
})

