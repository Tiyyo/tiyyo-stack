import * as z from 'zod';

export const requestUserSchema = z.object({
    params: z.object({
        id: z.string().uuid(),
    }),
})