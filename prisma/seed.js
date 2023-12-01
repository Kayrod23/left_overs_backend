const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
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

main()
.then(async () => {
    await prisma.$disconnect()
})
.catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
})