import { Controller } from '../../../presentation/contracts/Controller';
import { BcryptPassowrdManager } from '../bcrypt/BcryptPasswordManager';
import { HandleControllerErrorsDecorator } from '../decorators/HandleControllerErrorsDecorator';
import { JoiRequestValidator } from '../http/joi/validations/JoiRequestValidator';
import { userCredentialsSigInSchema } from '../http/joi/validations/schemas';

import { SingIn } from '../../../presentation/controllers/user/signIn/sing-in';
import { UsersRepository } from '../database/repositories/users-repository';
import { JwtTokenGenerator } from '../http/jwt/JwtTokenGenerator';
import { SignInUseCase } from '../../../modules/useCases/user/signIn/sign-in';


export function makeSignInController(): Controller {
  const usersRepository = new UsersRepository();
  const passwordManager = new BcryptPassowrdManager(10);
  const tokenGenerator = new JwtTokenGenerator();


  const signInUseCase = new SignInUseCase(
    usersRepository,
    passwordManager,
    tokenGenerator
  );

  const requestValidator = new JoiRequestValidator(userCredentialsSigInSchema);
  const signUpController = new SingIn(signInUseCase, requestValidator);

  return new HandleControllerErrorsDecorator(signUpController);
}
