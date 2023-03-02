import { IUsersRepository } from '../../../../shared/infra/database/interfaces/IUserRepository';
import { NotFoundError } from '../../../../shared/infra/http/errors/not-found';
import { PasswordCompare } from '../../../contracts/PasswordCompare';
import { PasswordEncrypter } from '../../../contracts/PasswordEncrypter';
import { UpdateProfileDTO } from './dtos';

class UpdateProfile {
  constructor(
    private readonly userRepository: IUsersRepository,
    private readonly passwordCompare: PasswordCompare,
    private readonly passwordEncrypter: PasswordEncrypter
  ) { }

  async execute({
    id, username, password, oldPassword
  }: UpdateProfileDTO) {
    const user = await this.userRepository.findById(id);

    if (!user) throw new NotFoundError('User not found!');

    const usernameWithUpdate = await this.userRepository.findByUsername(username);

    if (usernameWithUpdate && usernameWithUpdate.id !== id) {
      throw new NotFoundError('Username already exists!');
    }

    user.username = username;

    if (password && oldPassword) throw new NotFoundError('Old password is required');

    if (password && oldPassword) {
      const checkOldPassword = await this.passwordCompare.compare(oldPassword, user.password);

      if (!checkOldPassword) throw new NotFoundError('Old password does not match');

      user.password = await this.passwordEncrypter.encrypt(password);
    }

    user.username = username;

    return user;
  }
}


export { UpdateProfile };
