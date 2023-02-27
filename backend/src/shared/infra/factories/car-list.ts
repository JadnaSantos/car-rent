import { CarsListUseCase } from '../../../modules/useCases/car/car-list/cars-list';
import { Controller } from '../../../presentation/contracts/Controller';
import { CarsRepository } from '../database/repositories/cars-respository';
import { CarsListController } from '../../../presentation/controllers/car/car-list/car-list-controller';
import { HandleControllerErrorsDecorator } from '../decorators/HandleControllerErrorsDecorator';

export function makeListCarsController(): Controller {
  const carsRepository = new CarsRepository();
  const listCarsUseCase = new CarsListUseCase(carsRepository);
  const listCarsController = new CarsListController(listCarsUseCase);

  return new HandleControllerErrorsDecorator(listCarsController);
}
