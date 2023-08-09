import { Request, Response } from "express";
import { createUser, login } from "../service/auth/auth.ts";


export default {
    async register(req: Request, res: Response) {
        const data = {
            email: req.body.email,
            password: req.body.password
        }

        const isUserCreated = await createUser(data)

        if (isUserCreated) res.status(201).json(isUserCreated)

    },
    async signin(req: Request, res: Response) {
        const data = {
            email: req.body.email,
            password: req.body.password
        }

        const token = await login(data)

        res.json({ accessToken: token })
    },
    async current(req: Request, res: Response) {
        res.send(req.user[0])
    }
}