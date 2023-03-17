import { RemoveCarUseCase } from '../../../modules/useCases/car/remove-car/remove-car';
import { Controller } from '../../../presentation/contracts/Controller';
import { RemoveCarController } from '../../../presentation/controllers/car/remove-car/remove-car-controller';
import { CarsRepository } from '../database/repositories/cars-respository';
import { HandleControllerErrorsDecorator } from '../decorators/HandleControllerErrorsDecorator';


export function makeDeleteCarController(): Controller {
  const carsRepository = new CarsRepository();
  const deleteCarsUseCase = new RemoveCarUseCase(
    carsRepository,
  );

  const deleteCarController = new RemoveCarController(
    deleteCarsUseCase,
  );

  return new HandleControllerErrorsDecorator(deleteCarController);
}

