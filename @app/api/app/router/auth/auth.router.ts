import express, { Router } from 'express';
import authController from '../../controllers/auth.controller.ts';
import validate from '../../middleware/schema.validator.ts'
import factory from '../../middleware/factory.controller.ts'
import schemas from '@tiyyo-stack/schema'
import { validateToken } from '../../middleware/validate.token.ts';
import { canals } from '../../config/types.ts';


const router: Router = express.Router();

const { register, signin, current } = authController
const { userSchema } = schemas


router.route('/login')
    .post(factory(signin))

router.route('/register')
    .post(validate(userSchema, canals.body), factory(register))

router.route('/current')
    .get(validateToken, factory(current))


export default router    