import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
    {
        email: 'alice@prisma.io',
        password: 'alicecagilsse',
        profile: {
            create: {
                bio: 'I like turtles',
                name: 'Alice',
                date_of_birth: new Date(),
                posts: {
                    create: [
                        {
                            title: 'My first post',
                            content: 'Hello world!',
                            published: true,
                        }
                    ]

                }
            }
        },
    },
    {
        email: 'nilu@prisma.io',
        password: 'niluinielle',
        profile: {
            create: {
                bio: 'I like turtles',
                name: 'Nilu',
                date_of_birth: new Date(),
                posts: {
                    create: [
                        {
                            title: 'My first post',
                            content: 'Hello world!',
                            published: true,
                        }
                    ]

                }
            }
        },
    },
    {
        email: 'mahmoud@prisma.io',
        password: 'mahmoudmohamed',
        profile: {
            create: {
                bio: 'I like turtles',
                name: 'Mahmoud',
                date_of_birth: new Date(),
                posts: {
                    create: [
                        {
                            title: 'My first post',
                            content: 'Hello world!',
                            published: true,
                        }
                    ]

                }
            }
        }
    },
]

async function main() {
    console.log(`Start seeding ...`)
    for (const u of userData) {
        const user = await prisma.user.create({
            data: u,
        })
        console.log(`Created user with id: ${user.id}`)
    }
    console.log(`Seeding finished.`)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })