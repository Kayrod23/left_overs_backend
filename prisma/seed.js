const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Test Seed data for Users
async function users() {
    const test = await prisma.users.upsert({
        where: { email: 'test@gmail.com' },
        update: {},
        create: {
            email: 'test@gmail.com',
            name: 'Test',
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
        where: { id: 2 },
        update: {},
        create: {
            item: 'testItem',
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

async function recipes() {
    const test = await prisma.recipes.upsert({
        where: { id: 2},
        update: {},
        create: {
            recipeName: 'tomato',
            recipeSteps: 'move'
        }
    })
    console.log({ test });
}

recipes()
.then(async () => {
    await prisma.$disconnect()
})
.catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
})
