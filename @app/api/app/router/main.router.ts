import express, { Router } from 'express';
import userRouter from './user/user.router.ts'
import NotFoundError from '../helpers/errors/not.found.error.ts';
import { errorHandler } from '../middleware/error.handlers.ts';

const router: Router = express.Router();

router.use('/api/user', userRouter);

router.use(errorHandler)

router.use(() => {
    throw new NotFoundError('Not Found');
})


export default router;