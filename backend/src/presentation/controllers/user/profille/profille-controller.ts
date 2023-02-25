import { ProfilleUseCase } from '../../../../modules/useCases/user/profille/profille';
import { Controller } from '../../../contracts/Controller';
import { HttpRequest, HttpResponse, RequestUser } from '../../../contracts/Http';

class ProfilleController implements Controller {
  constructor(
    private readonly profile: ProfilleUseCase,
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

export { ProfilleController };
