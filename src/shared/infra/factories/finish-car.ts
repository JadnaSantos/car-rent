import { CarsRepository } from '../database/repositories/cars-respository';
import { Controller } from '../../../presentation/contracts/Controller';
import { FinishCarsUseCase } from '../../../modules/useCases/car/finishCar/finish-car';
import { HandleControllerErrorsDecorator } from '../decorators/HandleControllerErrorsDecorator';
import { FinishCarController } from '../../../presentation/controllers/car/finishCar/finish-controller-car';

export function makeFinishCarController(): Controller {
  const carsRepository = new CarsRepository();
  const createCarsUseCase = new FinishCarsUseCase(
    carsRepository
  );

  const createCarController = new FinishCarController(
    createCarsUseCase,
  );

  return new HandleControllerErrorsDecorator(createCarController);
}
