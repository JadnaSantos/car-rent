import { Controller } from '../../../contracts/Controller';
import { CarDetailsUseCase } from '../../../../modules/useCases/car/car-details/car-details';
import { HttpRequest, HttpResponse } from '../../../contracts/Http';

class CarDetailsController implements Controller {
  constructor(
    private readonly detailsCar: CarDetailsUseCase,
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

export { CarDetailsController };
