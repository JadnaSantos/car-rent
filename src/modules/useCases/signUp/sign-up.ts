
import { UserDTO } from './dtos';
import { User } from '@prisma/client';
import { PasswordEncrypter } from '../../contracts/PasswordEncrypter';
import { ConflictError } from '../../../shared/infra/http/errors/conflict';
import { IUsersRepository } from '../../../shared/infra/database/interfaces/IUserRepository';

class SignUpUseCase {
  constructor(
    private readonly usersRepository: IUsersRepository,
    private readonly passwordEncrypter: PasswordEncrypter
  ) { }

  async execute({ username, password, phone }: UserDTO): Promise<User> {
    const userAlreadyExists = await this.usersRepository.findByUsername(username);
    const phoneNumber = await this.usersRepository.findByPhoneNumber(phone);

    if (userAlreadyExists) {
      throw new ConflictError('User already exists!');
    } else if (phoneNumber) {
      throw new ConflictError('Phone already exists!');
    }

    const hashedPassword = await this.passwordEncrypter.encrypt(password);

    const user = await this.usersRepository.create({
      username,
      password: hashedPassword,
      phone
    });

    return user;

  }
}

export { SignUpUseCase };
