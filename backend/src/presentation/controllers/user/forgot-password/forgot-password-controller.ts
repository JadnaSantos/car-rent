import { ForgotPasswordUseCase } from '../../../../modules/useCases/user/forgot-password/forgot-password';
import { InvalidRequestError } from '../../../../shared/infra/http/errors/invalid-request';
import { Controller } from '../../../contracts/Controller';
import { HttpRequest, HttpResponse } from '../../../contracts/Http';
import { RequestValidator } from '../../../contracts/RequestValidator';

class ForgotPasswordController implements Controller {
  constructor(
    private readonly forgotpassword: ForgotPasswordUseCase,
    private readonly requestValidator: RequestValidator
  ) { }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const isRequestValid = await this.requestValidator.validate(request.body);

    if (!isRequestValid) {
      throw new InvalidRequestError(
        'Please check the username and password fields and try again'
      );
    }

    const username = await this.forgotpassword.execute(request.body);

    return {
      statusCode: 201,
      body: username
    };
  }
}


export { ForgotPasswordController };
