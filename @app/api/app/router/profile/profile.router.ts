import express, { Router } from 'express';
import profileController from '../../controllers/profile.controller.ts'
import factory from '../../middleware/factory.controller.ts'
import schemas from '@tiyyo-stack/schema'
import validate from '../../middleware/schema.validator.ts'
import upload from '../../service/upload/upload.ts';
import { canals } from '../../config/types.ts';


const { createProfile } = schemas


const router: Router = express.Router();

const { create, update, getAll, getOne, addAvatar } = profileController


router.route('/')
    .post(validate(createProfile, canals.body), factory(create))
    .patch(validate(createProfile, canals.body), factory(update))
    .get(factory(getAll))


router.route('/:id')
    .get(factory(getOne))

router.route('/avatar').patch(upload.single('image'), factory(addAvatar))



export default router    