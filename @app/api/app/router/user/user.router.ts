import express, { Router } from 'express';
import userController from '../../controllers/user.controller.ts'
import factory from '../../middleware/factory.controller.ts'
import pkg from '@tiyyo-stack/schema'
import validate from '../../middleware/schema.validator.ts'
const { userSchema } = pkg


const router: Router = express.Router();

const { getOne, getAll, create, update, destroy } = userController


router.route('/')
    .get(factory(getAll))
    .post(validate(userSchema), factory(create))
    .patch(factory(update))
    .delete(factory(destroy))

router.route('/:id')
    .get(factory(getOne))


export default router    