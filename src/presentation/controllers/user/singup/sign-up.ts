import { Controller } from '../../../contracts/Controller';
import { HttpRequest, HttpResponse } from '../../../contracts/Http';
import { RequestValidator } from '../../../contracts/RequestValidator';
import { SignUpUseCase } from '../../../../modules/useCases/signUp/sign-up';
import { InvalidRequestError } from '../../../../shared/infra/http/errors/invalid-request';

class SingUp implements Controller {
  constructor(
    private readonly signup: SignUpUseCase,
    private readonly requestValidator: RequestValidator
  ) { }
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const isRequestValid = await this.requestValidator.validate(request.body);

    if (!isRequestValid) {
      throw new InvalidRequestError(
        'Please check the username and password fields and try again'
      );
    }

    const userData = await this.signup.execute(request.body);

    return {
      statusCode: 201,
      body: userData
    };
  }
}

export { SingUp };
