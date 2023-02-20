import { DeleteCarUseCase } from '../../../modules/useCases/car/deleteCar/delete-car';
import { Controller } from '../../../presentation/contracts/Controller';
import { DeleteCarController } from '../../../presentation/controllers/car/deleteCar/delete-car-controller';
import { CarsRepository } from '../database/repositories/cars-respository';
import { UsersRepository } from '../database/repositories/users-repository';
import { HandleControllerErrorsDecorator } from '../decorators/HandleControllerErrorsDecorator';


export function makeDeleteCarController(): Controller {
  // const userRepository = new UsersRepository();
  const carsRepository = new CarsRepository();
  const deleteCarsUseCase = new DeleteCarUseCase(
    carsRepository,
  );

  const deleteCarController = new DeleteCarController(
    deleteCarsUseCase,
  );

  return new HandleControllerErrorsDecorator(deleteCarController);
}

