import { PrismaClient, Prisma } from '@prisma/client'
import logger from '../app/helpers/logger.ts'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
    {
        email: 'alice@prisma.io',
        password: 'alicecagilsse',
        profile: {
            create: {
                bio: 'I like turtles',
                firstname: 'Alice',
                date_of_birth: new Date('1998-12-12'),
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
                username: 'Nilu',
                date_of_birth: new Date('1992-12-12'),
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
                firstname: 'Mahmoud',
                date_of_birth: new Date('1996-02-12'),
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
    logger.info(`Start seeding ...`)
    for (const u of userData) {
        const user = await prisma.user.create({
            data: u,
        })
        logger.info(`Created user with id: ${user.id}`)
    }
    logger.info(`Seeding finished.`)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        logger.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })