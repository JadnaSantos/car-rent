import { Controller } from '../../../presentation/contracts/Controller';
import { CarsRepository } from '../database/repositories/cars-respository';
import { CreateCarUseCase } from '../../../modules/useCases/car/createCar/create-car';
import { HandleControllerErrorsDecorator } from '../decorators/HandleControllerErrorsDecorator';
import { CreateCarController } from '../../../presentation/controllers/car/createCar/create-controller-car';
import { carCredentialsShema } from '../http/joi/validations/schemas';
import { JoiRequestValidator } from '../http/joi/validations/JoiRequestValidator';

export function makeCreateCarController(): Controller {
  const carsRepository = new CarsRepository();
  const createCarsUseCase = new CreateCarUseCase(
    carsRepository
  );

  const requestValidator = new JoiRequestValidator(carCredentialsShema);
  const createCarController = new CreateCarController(
    createCarsUseCase,
    requestValidator
  );

  return new HandleControllerErrorsDecorator(createCarController);
}

