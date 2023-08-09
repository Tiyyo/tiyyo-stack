import { Request, Response } from 'express';
import User from '../models/user.ts'
import ServerError from '../helpers/errors/server.error.ts';
import { Prisma } from '@prisma/client';
import { cacheOrGetCacheData } from '../helpers/cache.data.ts';
import { Redis } from "ioredis"

const redis = new Redis()

export default {
    // Controller should only perfom database operations and return a response
    async getOne(req: Request, res: Response) {
        const { id } = req.body
        if (!id) throw new ServerError('Invalid user id');

        const user = await cacheOrGetCacheData(`user${id}`, async () => {
            try {
                const userId: Prisma.UserWhereUniqueInput = id

                const data = await User.findUnique(userId);
                return data
            } catch (error) {
                // find a better way to handle this error
                throw new Error('Could not fetch users from cache')
            }
        })
        res.status(200).json(user);
    },
    async getAll(_req: Request, res: Response) {

        const users = await cacheOrGetCacheData('users', async () => {
            try {
                const data = await User.findMany();
                return data

            } catch (error) {
                // find a better way to handle this error
                throw new Error('Could not fetch users from cache')
            }

        })
        res.status(200).json(users);
    },
    async create(req: Request, res: Response) {
        const { email, password } = req.body

        const user = await User.create({
            email,
            password
        })
        // delete cache when a mutation occurs
        await redis.del('users')
        res.status(201).json(user);
    },
    async update(req: Request, res: Response) {
        const { id, data } = req.body
        if (!id) throw new ServerError('Invalid user id');

        const userId: Prisma.UserWhereUniqueInput = id

        const user = await User.update(userId, data);

        // delete cache when a mutation occurs
        await redis.del('users')
        res.status(200).json(user);
    },
    async destroy(req: Request, res: Response) {
        const { id } = req.params
        if (!id) throw new ServerError('Invalid user id');

        const userId: any = id

        // console.log(user, 'USER')
        const user = await User.delete({ id: userId });
        // delete cache when a mutation occurs
        await redis.del('users')

        res.status(200).json(!!user);
    },
}