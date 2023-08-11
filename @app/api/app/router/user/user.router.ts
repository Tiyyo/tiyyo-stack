import express, { Router } from 'express';
import userController from '../../controllers/user.controller.ts'
import factory from '../../middleware/factory.controller.ts'
import schemas from '@tiyyo-stack/schema'
import validate from '../../middleware/schema.validator.ts'
import upload from '../../service/upload/upload.ts';
import { canals } from '../../config/types.ts';

const { userSchema } = schemas


const router: Router = express.Router();

const { getOne, getAll, create, update, destroy } = userController




router.route('/')
    .get(factory(getAll))
    .post(validate(userSchema, canals.body), upload.single('image'), factory(create))

router.route('/:id')
    .get(factory(getOne))
    .patch(factory(update))
    .delete(factory(destroy))


export default router    