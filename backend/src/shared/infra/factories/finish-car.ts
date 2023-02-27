import { CarsRepository } from '../database/repositories/cars-respository';
import { Controller } from '../../../presentation/contracts/Controller';
import { HandleControllerErrorsDecorator } from '../decorators/HandleControllerErrorsDecorator';
import { FinishCarController } from '../../../presentation/controllers/car/finish-car/finish-car-controller-car';
import { FinishCarUseCase } from '../../../modules/useCases/car/finish-car/finish-car';

export function makeFinishCarController(): Controller {
  const carsRepository = new CarsRepository();
  const createCarsUseCase = new FinishCarUseCase(
    carsRepository
  );

  const createCarController = new FinishCarController(
    createCarsUseCase,
  );

  return new HandleControllerErrorsDecorator(createCarController);
}
