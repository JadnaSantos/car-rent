import { Controller } from '../../../presentation/contracts/Controller';
import { UsersRepository } from '../database/repositories/users-repository';
import { ProfilleUseCase } from '../../../modules/useCases/user/profille/profille';
import { HandleControllerErrorsDecorator } from '../decorators/HandleControllerErrorsDecorator';
import { ProfilleController } from '../../../presentation/controllers/user/profille/profille-controller';

export function makeProfilleController(): Controller {
  const usersRepository = new UsersRepository();

  const ProfileUseCase = new ProfilleUseCase(
    usersRepository,
  );

  const signUpController = new ProfilleController(ProfileUseCase);

  return new HandleControllerErrorsDecorator(signUpController);
}
