import { CarsRepository } from '../database/repositories/cars-respository';
import { HandleControllerErrorsDecorator } from '../decorators/HandleControllerErrorsDecorator';
import { NewCarController } from '../../../presentation/controllers/car/new-car/new-car-controller';
import { carCredentialsShema } from '../http/joi/validations/schemas';
import { JoiRequestValidator } from '../http/joi/validations/JoiRequestValidator';
import { Controller } from '../../../presentation/contracts/Controller';
import { NewCarUseCase } from '../../../modules/useCases/car/new-car/new-car';

export function makeCreateCarController(): Controller {
  const carsRepository = new CarsRepository();
  const createCarsUseCase = new NewCarUseCase(
    carsRepository
  );

  const requestValidator = new JoiRequestValidator(carCredentialsShema);
  const createCarController = new NewCarController(
    createCarsUseCase,
    requestValidator
  );

  return new HandleControllerErrorsDecorator(createCarController);
}

