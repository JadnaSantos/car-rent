import { UserProfileUseCase } from '../../../../modules/useCases/user/user-profile/user-profile';
import { Controller } from '../../../contracts/Controller';
import { HttpRequest, HttpResponse, RequestUser } from '../../../contracts/Http';

class UserProfileController implements Controller {
  constructor(
    private readonly profile: UserProfileUseCase,
  ) { }
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { id } = request.user as RequestUser;

    const user = await this.profile.execute(id);

    return {
      statusCode: 201,
      body: user
    };
  }
}

export { UserProfileController };
