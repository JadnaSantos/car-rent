import { Controller } from '../../../presentation/contracts/Controller';
import { UsersRepository } from '../database/repositories/users-repository';
import { UserProfileUseCase } from '../../../modules/useCases/user/user-profile/user-profile';
import { HandleControllerErrorsDecorator } from '../decorators/HandleControllerErrorsDecorator';
import { UserProfileController } from '../../../presentation/controllers/user/user-profile/user-profile-controller';

export function makeProfilleController(): Controller {
  const usersRepository = new UsersRepository();

  const ProfileUseCase = new UserProfileUseCase(
    usersRepository,
  );

  const signUpController = new UserProfileController(ProfileUseCase);

  return new HandleControllerErrorsDecorator(signUpController);
}
