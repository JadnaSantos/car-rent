import { Router } from 'express';
import { makeSignInController } from '../../../factories/sign-in';
import { makeSignUpController } from '../../../factories/sign-up';
import { adaptRoute } from '../../config/adapter';

const usersRouterSignUp = Router();
const usersRouterSignIn = Router();

usersRouterSignUp.post('/', adaptRoute(makeSignUpController()));
usersRouterSignIn.post('/', adaptRoute(makeSignInController()));


export { usersRouterSignUp, usersRouterSignIn };
