import { Controller } from '../../../contracts/Controller';
import { DeleteCarUseCase } from '../../../../modules/useCases/car/deleteCar/delete-car';
import { HttpRequest, HttpResponse, RequestUser } from '../../../contracts/Http';

class DeleteCarController implements Controller {
  constructor(
    private readonly deleteCar: DeleteCarUseCase,
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


export { DeleteCarController };
