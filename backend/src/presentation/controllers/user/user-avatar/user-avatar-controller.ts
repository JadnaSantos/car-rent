import { UserAvatarUseCase } from '../../../../modules/useCases/user/user-avatar/user-avatar';
import { Controller } from '../../../contracts/Controller';
import { HttpRequest, HttpResponse, RequestUser } from '../../../contracts/Http';

class UserAvatarController implements Controller {
  constructor(
    private readonly avatarRepository: UserAvatarUseCase,
  ) { }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { id: user_id } = request.user as RequestUser;

    const avatarFileName = request.file;

    const user = await this.avatarRepository.execute({
      user_id, avatarFileName
    });

    console.log(user);

    return {
      statusCode: 201,
      body: user
    };

  }
}

export { UserAvatarController };
