import createToken from "../../helpers/create.token.ts"
import DatabaseError from "../../helpers/errors/database.error.ts"
import ServerError from "../../helpers/errors/server.error.ts"
import UserInputError from "../../helpers/errors/user.input.error.ts"
import { prisma } from "../db_client/db.client.ts"
import bcrypt from 'bcrypt'

export async function createUser(data: { email: string, password: string }): Promise<boolean> {
    const { email, password } = data
    const saltRouds = 10

    try {
        const hashedPassword = await bcrypt.hash(password, saltRouds).catch((err) => {
            if (err) throw new ServerError("Couldn't hash user password")
        })

        if (!hashedPassword) throw new ServerError('hash password is missing')

        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            }
        })
        return !!newUser
    } catch (error: any) {
        throw new DatabaseError("Most likely an user already exist", "User", error)
    }
}

export async function login(data: { email: string, password: string }): Promise<string> {
    const { email, password } = data

    const user = await prisma.user.findFirst({
        where: {
            email
        }
    })

    if (!user) throw new UserInputError("Can't find any user with this email", "wrong credentials")

    if (!await bcrypt.compare(password, user.password)) throw new UserInputError("Password didn't match", "wrong credentials")

    const accesToken = createToken("24h", { userId: user.id })

    return accesToken
}

