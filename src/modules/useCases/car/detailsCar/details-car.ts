import { ICarsRepository } from '../../../../shared/infra/database/interfaces/ICarsRepository';
import { NotFoundError } from '../../../../shared/infra/http/errors/not-found';
import { CarsDTO } from '../dtos';

class DetailsCarUseCase {
  constructor(private readonly carsRepository: ICarsRepository) { }

  async execute(id: string): Promise<CarsDTO | null> {
    const cars = await this.carsRepository.getCarById(id);

    if (!cars) {
      throw new NotFoundError('Car id not found');
    }

    return cars;
  }
}

export { DetailsCarUseCase };
