import { Controller } from '../../../contracts/Controller';
import { HttpRequest, HttpResponse } from '../../../contracts/Http';
import { InvalidRequestError } from '../../../../shared/infra/http/errors/invalid-request';
import { RequestValidator } from '../../../contracts/RequestValidator';
import { SignInUseCase } from '../../../../modules/useCases/user/sign-in/sign-in';

class SingIn implements Controller {
  constructor(
    private readonly signIn: SignInUseCase,
    private readonly requestValidator: RequestValidator
  ) { }
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const isRequestValid = await this.requestValidator.validate(request.body);

    if (!isRequestValid) {
      throw new InvalidRequestError(
        'Please check the username and password fields and try again'
      );
    }

    const userDataAcess = await this.signIn.execute(request.body);

    return {
      statusCode: 201,
      body: userDataAcess
    };
  }
}

export { SingIn };
