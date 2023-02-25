import fs from 'fs';
import path from 'path';
import { UserAvatar } from './dto';
import uploadConfig from '../../../../config/multer';
import { NotFoundError } from '../../../../shared/infra/http/errors/not-found';
import { IUsersRepository } from '../../../../shared/infra/database/interfaces/IUserRepository';

class UserAvatarUseCase {
  constructor(
    private readonly userRepository: IUsersRepository
  ) { }

  async execute({ user_id, avatarFileName }: UserAvatar) {
    const user = await this.userRepository.findById(user_id);

    if (!user) throw new NotFoundError('User not found!');

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExistis = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExistis) await fs.promises.unlink(userAvatarFilePath);
    }

    user.avatar = avatarFileName;

    return user;

  }
}

export { UserAvatarUseCase };
