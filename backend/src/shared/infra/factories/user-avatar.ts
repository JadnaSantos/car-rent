import { UserAvatarUseCase } from '../../../modules/useCases/user/user-avatar/user-avatar';
import { Controller } from '../../../presentation/contracts/Controller';
import { UserAvatarController } from '../../../presentation/controllers/user/user-avatar/user-avatar-controller';
import { UsersRepository } from '../database/repositories/users-repository';
import { HandleControllerErrorsDecorator } from '../decorators/HandleControllerErrorsDecorator';

export function makeUserAvatarController(): Controller {
  const usersRepository = new UsersRepository();

  const userAvatarUseCase = new UserAvatarUseCase(
    usersRepository,
  );

  const userAvatarController = new UserAvatarController(userAvatarUseCase);

  return new HandleControllerErrorsDecorator(userAvatarController);
}
