import express, { Router } from 'express';
import profileController from '../../controllers/profile.controller.ts'
import factory from '../../middleware/factory.controller.ts'
import schemas from '@tiyyo-stack/schema'
import validate from '../../middleware/schema.validator.ts'
import upload from '../../service/upload/upload.ts';


const { profileSchema } = schemas


const router: Router = express.Router();

const { create, } = profileController


router.route('/')


router.route('/:id')
    .post(validate(profileSchema), factory(create))


export default router    