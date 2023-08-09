import * as z from 'zod';

export const createUser = z.object({
    body: z.object({
        user_id: z.string().uuid(),
        name: z.string().optional(),


    })
})