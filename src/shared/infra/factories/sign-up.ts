import { SignUpUseCase } from '../../../modules/useCases/signUp/sign-up';
import { Controller } from '../../../presentation/contracts/Controller';
import { SingUp } from '../../../presentation/controllers/user/singup/sign-up';
import { BcryptPassowrdManager } from '../bcrypt/BcryptPasswordManager';
import { UsersRepository } from '../database/repositories/users-repository';
import { HandleControllerErrorsDecorator } from '../decorators/HandleControllerErrorsDecorator';
import { JoiRequestValidator } from '../http/joi/validations/JoiRequestValidator';
import { userCredentialsSchema } from '../http/joi/validations/schemas';


export function makeSignUpController(): Controller {
  const salt = 10;

  const usersRepository = new UsersRepository();
  const passwordManager = new BcryptPassowrdManager(salt);
  const signUpUseCase = new SignUpUseCase(usersRepository, passwordManager);

  const requestValidator = new JoiRequestValidator(userCredentialsSchema);
  const signUpController = new SingUp(signUpUseCase, requestValidator);

  return new HandleControllerErrorsDecorator(signUpController);
}
