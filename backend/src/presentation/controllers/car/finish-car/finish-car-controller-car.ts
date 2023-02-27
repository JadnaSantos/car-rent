import { Controller } from '../../../contracts/Controller';
import { HttpRequest, HttpResponse, RequestUser } from '../../../contracts/Http';
import { FinishCarUseCase } from '../../../../modules/useCases/car/finish-car/finish-car';

class FinishCarController implements Controller {
  constructor(
    private readonly finishCar: FinishCarUseCase,
  ) { }

  handle = async (request: HttpRequest): Promise<HttpResponse> => {
    const { id } = request.body;
    const { id: card_id } = request.user as RequestUser;

    const car = await this.finishCar.execute(id, card_id);

    return {
      statusCode: 200,
      body: car
    };
  };

}

export { FinishCarController };
