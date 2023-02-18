import multer from 'multer';
import { Router } from 'express';
import { createCarRouter, listCarRouter } from './car/car.routes';
import uploadConfig from '.././../../../config/multer';
import { usersRouterSignIn, usersRouterSignUp } from './user/user.routes';

const routes = Router();
const upload = multer(uploadConfig);


routes.use('/users', usersRouterSignUp);
routes.use('/signin', usersRouterSignIn);
routes.use('/cars', upload.single('file'), createCarRouter);
routes.use('/list-cars', listCarRouter);


export { routes };
