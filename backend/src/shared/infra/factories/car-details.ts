import { Controller } from '../../../presentation/contracts/Controller';
import { CarsRepository } from '../database/repositories/cars-respository';
import { CarDetailsUseCase } from '../../../modules/useCases/car/car-details/car-details';
import { CarDetailsController } from '../../../presentation/controllers/car/car-details/car-details-controller';
import { HandleControllerErrorsDecorator } from '../decorators/HandleControllerErrorsDecorator';


export function makeDetailsCarsController(): Controller {
  const carRepository = new CarsRepository();
  const detailsCarUseCase = new CarDetailsUseCase(carRepository);
  const detailsCarController = new CarDetailsController(detailsCarUseCase);

  return new HandleControllerErrorsDecorator(detailsCarController);
}
