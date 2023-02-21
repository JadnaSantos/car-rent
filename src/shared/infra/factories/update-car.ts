import { UpdateCarsUseCase } from '../../../modules/useCases/car/updateCar/update-car';
import { Controller } from '../../../presentation/contracts/Controller';
import { UpdateCarController } from '../../../presentation/controllers/car/updateCar/update-car-controller';
import { CarsRepository } from '../database/repositories/cars-respository';
import { HandleControllerErrorsDecorator } from '../decorators/HandleControllerErrorsDecorator';

export function makeUpdateCarController(): Controller {
  const carsRepository = new CarsRepository();
  const createCarsUseCase = new UpdateCarsUseCase(
    carsRepository
  );

  const createCarController = new UpdateCarController(
    createCarsUseCase,
  );

  return new HandleControllerErrorsDecorator(createCarController);
}
