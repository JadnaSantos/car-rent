import { ListCarsUseCase } from '../../../../modules/useCases/car/listCars/list-cars';
import { Controller } from '../../../contracts/Controller';
import { HttpResponse } from '../../../contracts/Http';

export class ListCarsController implements Controller {
  constructor(
    private readonly listCars: ListCarsUseCase
  ) { }

  handle = async (): Promise<HttpResponse> => {
    const cars = await this.listCars.execute();

    return {
      statusCode: 200,
      body: cars
    };
  };

}
