import { Controller } from '../../../presentation/contracts/Controller';
import { UsersRepository } from '../database/repositories/users-repository';
import { ForgotPasswordUseCase } from '../../../modules/useCases/user/forgot-password/forgot-password';
import { JoiRequestValidator } from '../http/joi/validations/JoiRequestValidator';
import { JwtTokenGenerator } from '../http/jwt/JwtTokenGenerator';
import { HandleControllerErrorsDecorator } from '../decorators/HandleControllerErrorsDecorator';
import { ForgotPasswordController } from '../../../presentation/controllers/user/forgot-password/forgot-password-controller';
import { forgotPasswordShema } from '../http/joi/validations/schemas';


export function makeForgotPasswordController(): Controller {
  const usersRepository = new UsersRepository();
  const tokenGenerator = new JwtTokenGenerator();


  const forgotpasswordUseCase = new ForgotPasswordUseCase(
    usersRepository, tokenGenerator
  );

  const requestValidator = new JoiRequestValidator(forgotPasswordShema);
  const forgotPassowordController = new ForgotPasswordController(
    forgotpasswordUseCase,
    requestValidator
  );

  return new HandleControllerErrorsDecorator(forgotPassowordController);
}
