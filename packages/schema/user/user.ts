import { z } from 'zod'

export const userSchema = z.object({
    email: z.string().email({ message: "This is not a valid email" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" })
})

