import { Controller } from '../../../contracts/Controller';
import { RequestValidator } from '../../../contracts/RequestValidator';
import { InvalidRequestError } from '../../../../shared/infra/http/errors/invalid-request';
import { HttpRequest, HttpResponse, RequestUser } from '../../../contracts/Http';
import { NewCarUseCase } from '../../../../modules/useCases/car/new-car/new-car';


class NewCarController implements Controller {
  constructor(
    private readonly createCar: NewCarUseCase,
    private readonly requestValidator: RequestValidator
  ) { }

  handle = async (request: HttpRequest): Promise<HttpResponse> => {
    const { id } = request.user as RequestUser;

    const isRequestValid = await this.requestValidator.validate(request.body);
    const isRequestValidFile = await this.requestValidator.validate(request.file);

    if (!isRequestValid && isRequestValidFile) {
      throw new InvalidRequestError('Invalid request. Please check your request body.');
    }

    if (id !== request.body.userId) {
      throw new InvalidRequestError('You cannot create a car for any user other than yourself.');
    } else {

      const banner = request.file;

      await this.createCar.execute({
        name: request.body.name,
        description: request.body.description,
        kilometers: request.body.kilometers,
        banner: banner,
        price: request.body.price,
        brand: request.body.brand,
        userId: id,
        year: request.body.year,
        status: request.body.status,
        draft: request.body.draft
      });
    }

    return {
      statusCode: 201,
      body: { message: 'Car created' }
    };
  };
}


export { NewCarController };
