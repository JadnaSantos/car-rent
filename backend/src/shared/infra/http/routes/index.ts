import multer from 'multer';
import { Router } from 'express';
import uploadConfig from '.././../../../config/multer';
import {
  createCarRouter,
  listCarRouter,
  detailsRouter,
  deleteCarRouter,
  updateCarRouter,
  finishCarRouter
} from './car/car.routes';
import {
  userAvatarRouter,
  userProfilleRouter,
  usersRouterSignIn,
  usersRouterSignUp
} from './user/user.routes';

const routes = Router();
const upload = multer(uploadConfig);


routes.use('/users', usersRouterSignUp);
routes.use('/signin', usersRouterSignIn);
routes.use('/profile', userProfilleRouter);
routes.use('/user/avatar', upload.single('avatar'), userAvatarRouter);
routes.use('/cars', upload.single('file'), createCarRouter);
routes.use('/list-cars', listCarRouter);
routes.use('/cars', detailsRouter);
routes.use('/car', deleteCarRouter);
routes.use('/update-car', updateCarRouter);
routes.use('/car-finish', finishCarRouter);


export { routes };
