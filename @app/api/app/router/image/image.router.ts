import express, { Router } from 'express';
import upload from '../../service/upload/upload.ts';
import imageController from '../../controllers/image.controller.ts'
import factory from '../../middleware/factory.controller.ts'



const router: Router = express.Router()

const { create, destroy } = imageController

router.route('/')
    .post(upload.single('image'), factory(create))

router.route('/:imagekey')
    .delete(factory(destroy))

export default router