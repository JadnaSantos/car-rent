import { CarsListUseCase } from '../../../../modules/useCases/car/car-list/cars-list';
import { Controller } from '../../../contracts/Controller';
import { HttpResponse } from '../../../contracts/Http';

class CarsListController implements Controller {
  constructor(
    private readonly listCars: CarsListUseCase
  ) { }

  handle = async (): Promise<HttpResponse> => {
    const cars = await this.listCars.execute();

    return {
      statusCode: 200,
      body: cars
    };
  };
}

export { CarsListController };
