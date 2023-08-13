import * as z from 'zod';

export const createProfile = z.object({
    user_id: z.string().uuid(),
    user: z.string().nullable().optional(),
    username: z.string().nullable().optional(),
    firstname: z.string().nullable().optional(),
    lastname: z.string().nullable().optional(),
    date_of_birth: z.string().datetime().nullable().optional(),
    bio: z.string().nullable().optional(),
    avatar: z.string().nullable().optional(),
})