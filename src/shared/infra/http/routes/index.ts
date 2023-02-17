import multer from 'multer';
import { Router } from 'express';
import { createCarRouter } from './car/car.routes';
import uploadConfig from '.././../../../config/multer';
import { usersRouterSignIn, usersRouterSignUp } from './user/user.routes';

const routes = Router();
const upload = multer(uploadConfig);


routes.use('/users', usersRouterSignUp);
routes.use('/signin', usersRouterSignIn);
routes.use('/cars', upload.single('file'), createCarRouter);


export { routes };
