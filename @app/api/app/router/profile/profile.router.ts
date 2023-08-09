import express, { Router } from 'express';
import profileController from '../../controllers/profile.controller.ts'
import factory from '../../middleware/factory.controller.ts'
import schemas from '@tiyyo-stack/schema'
import validate from '../../middleware/schema.validator.ts'
import upload from '../../service/upload/upload.ts';
const { profileSchema } = schemas


const router: Router = express.Router();

const { getOne, getAll, create, update, destroy } = profileController


router.route('/')
    .get(factory(getAll))
    .post(validate(profileSchema), upload.single('image'), factory(create))

router.route('/:id')
    .get(factory(getOne))
    .patch(factory(update))
    .delete(factory(destroy))


export default router    