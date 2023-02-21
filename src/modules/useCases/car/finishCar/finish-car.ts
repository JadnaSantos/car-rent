import { ICarsRepository } from '../../../../shared/infra/database/interfaces/ICarsRepository';
import { NotFoundError } from '../../../../shared/infra/http/errors/not-found';
import { CarsDTO } from '../dtos';

class FinishCarsUseCase {
  constructor(private readonly carsRepository: ICarsRepository) { }

  async execute(id: string, user: string): Promise<CarsDTO> {
    const cars = await this.carsRepository.finishCar(id, user);

    if (cars.userId !== user) {
      throw new NotFoundError('You not owner of this car');
    }
    return cars;

  }

}

export { FinishCarsUseCase };
