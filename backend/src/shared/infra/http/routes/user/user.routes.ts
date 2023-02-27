import { Router } from 'express';
import { adaptRoute } from '../../config/adapter';
import { makeSignUpController } from '../../../factories/sign-up';
import { makeSignInController } from '../../../factories/sign-in';
import { makeProfilleController } from '../../../factories/user-profile';
import { authenticate } from '../../middlewares/authenticate';
import { makeUserAvatarController } from '../../../factories/user-avatar';
import { makeForgotPasswordController } from '../../../factories/forgot-password';

const usersRouterSignUp = Router();
const usersRouterSignIn = Router();
const userProfilleRouter = Router();
const userAvatarRouter = Router();
const forgotPasswordRouter = Router();


usersRouterSignUp.post('/', adaptRoute(makeSignUpController()));
usersRouterSignIn.post('/', adaptRoute(makeSignInController()));
userProfilleRouter.get('/', authenticate, adaptRoute(makeProfilleController()));
userAvatarRouter.patch('/', authenticate, adaptRoute(makeUserAvatarController()));
forgotPasswordRouter.post('/', adaptRoute(makeForgotPasswordController()));


export {
  usersRouterSignUp,
  usersRouterSignIn,
  userProfilleRouter,
  userAvatarRouter,
  forgotPasswordRouter
};
