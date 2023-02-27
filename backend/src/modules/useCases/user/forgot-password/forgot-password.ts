import path from 'path';
import { TokenGenerator } from '../../../contracts/TokenGenerator';
import { NotFoundError } from '../../../../shared/infra/http/errors/not-found';
import { IUsersRepository } from '../../../../shared/infra/database/interfaces/IUserRepository';
import { EtherealMail } from '../../../../config/mail/EtherealMail';
import { UserAccessDataDTO } from '../sign-in/dtos';

class ForgotPasswordUseCase {
  constructor(
    private readonly userRepository: IUsersRepository,
    private readonly tokenGenerator: TokenGenerator,
  ) { }

  async execute({ username }: UserAccessDataDTO): Promise<UserAccessDataDTO> {
    const user = await this.userRepository.findByUsername(username);
    console.log(user);

    if (!user) throw new NotFoundError('User does not exist');

    const token = await this.tokenGenerator.generate({
      id: user.id,
      username: user.username,
    });

    const forgotpasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    await EtherealMail.sendMail({
      to: {
        username: user.username,
      },
      subject: '[Car-rent] Recuperação de Senha',
      templateData: {
        file: forgotpasswordTemplate,
        variables: {
          username: user.username,
          link: `http://localhost:3000/reset_password?token=${token}`,
        },
      },
    });

    return { id: user.id, username: user.username, token };
  }
}

export { ForgotPasswordUseCase };
