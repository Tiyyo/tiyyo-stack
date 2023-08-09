import { Prisma } from "@prisma/client";
import { prisma } from "../service/db_client/db.client.ts"
import DatabaseError from "../helpers/errors/database.error.ts";


export default {
    async create(data: Prisma.ImageCreateInput) {
        try {
            return await prisma.image.create({
                data
            })
        } catch (error: any) {
            throw new DatabaseError(error.message, 'image', error)
        }
    },
    async destroy(key: string) {
        try {
            const result = await prisma.image.delete({
                where: {
                    key
                }
            })
            return !!result
        } catch (error: any) {
            throw new DatabaseError(error.message, 'image', error)
        }
    }
}