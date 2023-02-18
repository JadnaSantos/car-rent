import { Controller } from '../../../presentation/contracts/Controller';
import { CarsRepository } from '../database/repositories/cars-respository';
import { DetailsCarUseCase } from '../../../modules/useCases/car/detailsCar/details-car';
import { DetailsCarController } from '../../../presentation/controllers/car/detailsCar/details-controller-car';
import { HandleControllerErrorsDecorator } from '../decorators/HandleControllerErrorsDecorator';


export function makeDetailsCarsController(): Controller {
  const carRepository = new CarsRepository();
  const detailsCarUseCase = new DetailsCarUseCase(carRepository);
  const detailsCarController = new DetailsCarController(detailsCarUseCase);

  return new HandleControllerErrorsDecorator(detailsCarController);
}
