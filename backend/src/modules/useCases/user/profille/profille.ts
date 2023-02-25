import { IUsersRepository } from '../../../../shared/infra/database/interfaces/IUserRepository';
import { NotFoundError } from '../../../../shared/infra/http/errors/not-found';

class ProfilleUseCase {
  constructor(
    private readonly userRepository: IUsersRepository,
  ) { }

  async execute(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) throw new NotFoundError('User not found!');

    return user;
  }
}

export { ProfilleUseCase };


