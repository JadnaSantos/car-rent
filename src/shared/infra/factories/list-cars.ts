import { ListCarsUseCase } from '../../../modules/useCases/car/listCars/list-cars';
import { Controller } from '../../../presentation/contracts/Controller';
import { CarsRepository } from '../database/repositories/cars-respository';
import { ListCarsController } from '../../../presentation/controllers/car/listCar/list-car-controller';
import { HandleControllerErrorsDecorator } from '../decorators/HandleControllerErrorsDecorator';

export function makeListCarsController(): Controller {
  const carsRepository = new CarsRepository();
  const listCarsUseCase = new ListCarsUseCase(carsRepository);
  const listCarsController = new ListCarsController(listCarsUseCase);

  return new HandleControllerErrorsDecorator(listCarsController);
}
