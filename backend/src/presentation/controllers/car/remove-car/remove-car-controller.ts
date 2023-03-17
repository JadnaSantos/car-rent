import { Controller } from '../../../contracts/Controller';
import { HttpRequest, HttpResponse, RequestUser } from '../../../contracts/Http';
import { RemoveCarUseCase } from '../../../../modules/useCases/car/remove-car/remove-car';

class RemoveCarController implements Controller {
  constructor(
    private readonly deleteCar: RemoveCarUseCase,
  ) { }

  handle = async (request: HttpRequest): Promise<HttpResponse> => {
    const { id } = request.params;
    const { id: carId } = request.user as RequestUser;

    await this.deleteCar.execute(id, carId);

    return {
      statusCode: 200,
      body: { message: 'Car deleted' }
    };
  };
}


export { RemoveCarController };
