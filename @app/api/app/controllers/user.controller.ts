import { Request, Response } from 'express';
import User from '../models/user.ts'
import ServerError from '../helpers/errors/server.error.ts';
import { Prisma } from '@prisma/client';
import { cacheOrGetCacheData } from '../helpers/cache.data.ts';
import { Redis } from "ioredis"
import logger from '../helpers/logger.ts';

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

        //tempory solution to invalidate cache every getAll request
        // await redis.del('users', (err, reply) => {
        //     if (err) throw new ServerError('Could not delete cache')
        //     logger.info('Cache deleted', reply)
        // })

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

        console.log('is this working');
        // Invalidaiton cache : delete cache when a mutation occurs
        await redis.del('users', (err, reply) => {
            if (err) throw new ServerError('Could not delete cache')
            logger.info('Cache deleted', reply)
        })

        const user = await User.create({
            email,
            password
        })
        res.status(201).json(user);
    },
    async update(req: Request, res: Response) {
        const { id, data } = req.body
        if (!id) throw new ServerError('Invalid user id');

        // Invalidation cache : delete cache when a mutation occurs
        await redis.del('users', (err, reply) => {
            if (err) throw new ServerError('Could not delete cache')
            logger.info('Cache deleted', reply)
        })

        const userId: Prisma.UserWhereUniqueInput = id

        const user = await User.update(userId, data);
        res.status(200).json(user);
    },
    async destroy(req: Request, res: Response) {
        const { id } = req.params
        if (!id) throw new ServerError('Invalid user id');

        // Invalidation cache : delete cache when a mutation occurs
        await redis.del('users', (err, reply) => {
            if (err) throw new ServerError('Could not delete cache')
            logger.info('Cache deleted', reply)
        })

        const userId: any = id

        const user = await User.delete({ id: userId });

        res.status(200).json(!!user);
    },
}