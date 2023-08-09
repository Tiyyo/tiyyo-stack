import express, { Router } from 'express';
import userRouter from './user/user.router.ts'
import profileRouter from './profile/profile.router.ts'
import authRouter from './auth/auth.router.ts'
import imageRouter from './image/image.router.ts'
import NotFoundError from '../helpers/errors/not.found.error.ts';
import { errorHandler } from '../middleware/error.handlers.ts';

const router: Router = express.Router();

router.use('/api/user', userRouter);
router.use('/api/profile', profileRouter)
router.use('/api/image', imageRouter)
router.use('/auth', authRouter)

router.use((_req, _res, next) => {
    next(new NotFoundError("Request couldn't match any routes"));
})

router.use(errorHandler)


export default router;