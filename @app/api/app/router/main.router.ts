import express, { Router } from 'express';
import userRouter from './user/user.router.ts'

const router: Router = express.Router();

router.use('/api/user', userRouter);

router.use(() => {
    throw new Error('Not Found');
})

export default router;