import { Controller } from '../../../contracts/Controller';
import { HttpRequest, HttpResponse } from '../../../contracts/Http';
import { RequestValidator } from '../../../contracts/RequestValidator';
import { CreateCarUseCase } from '../../../../modules/useCases/car/createCar/create-car';
import { InvalidRequestError } from '../../../../shared/infra/http/errors/invalid-request';


class CreateCarController implements Controller {
  constructor(
    private readonly createCar: CreateCarUseCase,
    private readonly requestValidator: RequestValidator
  ) { }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const isRequestValid = await this.requestValidator.validate(request.body);

    if (!isRequestValid) {
      throw new InvalidRequestError(
        'Please check the fields and try again'
      );
    }

    const carData = await this.createCar.execute(request.body);

    console.log(carData);

    return {
      statusCode: 201,
      body: carData
    };
  }

}


export { CreateCarController };
