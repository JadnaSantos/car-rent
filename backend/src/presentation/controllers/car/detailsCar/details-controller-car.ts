import { Controller } from '../../../contracts/Controller';
import { DetailsCarUseCase } from '../../../../modules/useCases/car/detailsCar/details-car';
import { HttpRequest, HttpResponse } from '../../../contracts/Http';

class DetailsCarController implements Controller {
  constructor(
    private readonly detailsCar: DetailsCarUseCase,
  ) { }

  handle = async (request: HttpRequest): Promise<HttpResponse> => {
    const { id } = request.params;

    const cars = await this.detailsCar.execute(id);

    return {
      statusCode: 200,
      body: cars
    };
  };
}

export { DetailsCarController };
