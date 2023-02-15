import { Router } from 'express';
import { usersRouterSignIn, usersRouterSignUp } from './user/user.routes';

const routes = Router();

routes.use('/users', usersRouterSignUp);
routes.use('/signin', usersRouterSignIn);


export { routes };
