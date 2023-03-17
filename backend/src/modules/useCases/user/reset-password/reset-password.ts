import { IUsersRepository } from '../../../../shared/infra/database/interfaces/IUserRepository';
import { PasswordCompare } from '../../../contracts/PasswordCompare';
import { TokenGenerator } from '../../../contracts/TokenGenerator';
import { UserAccessDataDTO } from '../sign-in/dtos';

class ResetPassword {
  constructor(
    private readonly userRepository: IUsersRepository,
    private readonly tokenGenerator: TokenGenerator,
    private readonly passwordCompare: PasswordCompare
  ) { }

  async execute({ token, password, }: UserAccessDataDTO) {

    console.log('Not implement yet');

  }
}

export { ResetPassword };
