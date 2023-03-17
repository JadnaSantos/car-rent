import { UpdateCarUseCase } from '../../../../modules/useCases/car/update-car/update-car';
import { Controller } from '../../../contracts/Controller';
import { HttpRequest, HttpResponse, RequestUser } from '../../../contracts/Http';

class UpdateCarController implements Controller {
  constructor(
    private readonly updateCar: UpdateCarUseCase,
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

export { UpdateCarController };
