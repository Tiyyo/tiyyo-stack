import { Request, Response } from "express";
import { createUser, login } from "../service/auth/auth.ts";
import ServerError from "../helpers/errors/server.error.ts";
import logger from "../helpers/logger.ts";
import { Redis } from "ioredis"


const redis = new Redis()


export default {
    async register(req: Request, res: Response) {
        const data = {
            email: req.body.email,
            password: req.body.password
        }

        const isUserCreated = await createUser(data)

        // Invalidaiton cache : delete cache when a mutation occurs
        await redis.del('users', (err, reply) => {
            if (err) throw new ServerError('Could not delete cache')
            logger.info('Cache deleted', reply)
        })

        if (isUserCreated) res.status(201).json(isUserCreated)

    },
    async signin(req: Request, res: Response) {
        const data = {
            email: req.body.email,
            password: req.body.password
        }

        const token = await login(data)
        // send token in cookie in more secure way then keep it in localstorage
        // max age should be set through env variable 
        res.cookie('accessToken', token, { httpOnly: false, secure: false, maxAge: 24 * 60 * 60 * 1000, })
        res.status(200).json({ message: 'You are logged in' })
    },
    async current(req: Request, res: Response) {

        res.json(req.user[0])
    },
    async logout(_req: Request, res: Response) {
        res.clearCookie('accessToken')
        res.status(200).json({ message: 'You are logged out' })
    }
}