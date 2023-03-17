
import { IUsersRepository } from '../../../../shared/infra/database/interfaces/IUserRepository';
import { NotFoundError } from '../../../../shared/infra/http/errors/not-found';
import { PasswordCompare } from '../../../contracts/PasswordCompare';
import { TokenGenerator } from '../../../contracts/TokenGenerator';
import { UserAccessDataDTO, UserCredentialsDTO } from './dtos';


class SignInUseCase {
  constructor(
    private readonly usersRepository: IUsersRepository,
    private readonly passwordCompare: PasswordCompare,
    private readonly tokenGenerator: TokenGenerator
  ) { }

  async execute({
    username,
    password,
  }: UserCredentialsDTO): Promise<UserAccessDataDTO> {
    const user = await this.usersRepository.findByUsername(username);

    if (!user) throw new NotFoundError('User or password invalid!');

    const passwordMatch = await this.passwordCompare.compare(password, user.password);

    if (!passwordMatch) throw new NotFoundError('User or password not incorrect!');

    const token = await this.tokenGenerator.generate({
      id: user.id,
      username: user.username,
    });

    return { id: user.id, username: user.username, token };
  }
}

export { SignInUseCase };
