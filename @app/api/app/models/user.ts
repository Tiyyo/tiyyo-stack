import { Prisma } from "@prisma/client";
import { prisma } from "../service/db_client/db.client.ts"
import DatabaseError from "../helpers/errors/database.error.ts";


export default {
    async create(data: Prisma.UserCreateInput) {
        try {
            return await prisma.user.create({
                data,
            });
        } catch (error: any) {
            throw new DatabaseError(error.message, 'user', error);
        }
    },
    async findUnique(id: Prisma.UserWhereUniqueInput) {
        try {
            return await prisma.user.findUnique({
                where: id,
            });
        } catch (error: any) {
            throw new DatabaseError(error.message, 'user', error);
        }
    },
    async findMany(ids?: Prisma.UserWhereUniqueInput[]) {
        try {
            return await prisma.user.findMany({
                where: {
                    OR: ids,
                },
            });
        } catch (error: any) {
            throw new DatabaseError(error.message, 'user', error);
        }
    },
    async update(id: Prisma.UserWhereUniqueInput, data: Prisma.UserUpdateInput) {
        try {
            return await prisma.user.update({
                where: {
                    id: id
                },
                data: {
                    email: data.email,
                }
            });
        } catch (error: any) {
            throw new DatabaseError(error.message, 'user', error);
        }
    },
    async delete(id: Prisma.UserWhereUniqueInput) {

        try {
            return await prisma.user.delete({
                where: id,
            });
        } catch (error: any) {
            throw new DatabaseError(error.message, 'user', error);
        }
    }
}