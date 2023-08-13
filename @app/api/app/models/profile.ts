import { Prisma } from "@prisma/client";
import { prisma } from "../service/db_client/db.client.ts"
import DatabaseError from "../helpers/errors/database.error.ts";


export default {
    async create(profile: Prisma.ProfileCreateInput) {
        try {
            const userProfile = await prisma.profile.create({
                data: {
                    ...profile
                }
            })
            return !!userProfile
        } catch (error: any) {
            throw new DatabaseError(error.message, "profile", error)
        }
    },
    async findOrCreate(userId: string) {
        try {
            const userProfile = await prisma.profile.upsert({
                where: {
                    user_id: userId
                },
                update: {},
                create: {
                    user_id: userId
                }
            })

            return userProfile
        } catch (error: any) {
            throw new DatabaseError(error.message, "profile", error)
        }
    },
    async findAll() {

        try {
            const userProfiles = await prisma.profile.findMany()

            return userProfiles
        } catch (error: any) {

            throw new DatabaseError(error.message, "profile", error)
        }
    },
    async update(profile: Prisma.ProfileCreateInput) {

        const { user_id, ...rest } = profile

        try {

            const userProfile = await prisma.profile.findFirst({
                where: {
                    user_id: user_id
                }
            })
            if (!userProfile) {
                this.create(profile as Prisma.ProfileCreateInput)
            } else {
                await prisma.profile.update({
                    where: {
                        id: userProfile.id
                    },
                    data: {
                        ...rest
                    }
                })
            }
        } catch (error: any) {
            throw new DatabaseError(error.message, "profile", error)
        }
    },
    async avatar(user_id: string, imageId: number) {
        try {
            const userProfile = await prisma.profile.update({
                where: {
                    user_id: user_id
                },
                data: {
                    avatar_id: imageId
                },
                include: {
                    avatar: true
                }
            })
            return userProfile
        } catch (error: any) {
            throw new DatabaseError(error.message, "profile", error)
        }
    }
}