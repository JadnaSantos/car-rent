import { UpdateCarsUseCase } from '../../../../modules/useCases/car/updateCar/update-car';
import { Controller } from '../../../contracts/Controller';
import { HttpRequest, HttpResponse, RequestUser } from '../../../contracts/Http';
import { RequestValidator } from '../../../contracts/RequestValidator';
import { InvalidRequestError } from '../../../../shared/infra/http/errors/invalid-request';

export class UpdateCarController implements Controller {
  constructor(
    private readonly updateCar: UpdateCarsUseCase,
  ) { }

  handle = async (request: HttpRequest): Promise<HttpResponse> => {
    const { id } = request.body;
    const { id: card_id } = request.user as RequestUser;

    const car = await this.updateCar.execute(id, card_id);

    return {
      statusCode: 200,
      body: car
    };
  };

}
