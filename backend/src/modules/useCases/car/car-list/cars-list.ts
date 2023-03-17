import { ICarsRepository } from '../../../../shared/infra/database/interfaces/ICarsRepository';
import { CarsDTO } from '../dtos';

class CarsListUseCase {
  constructor(private readonly carsRepository: ICarsRepository) { }

  async execute(): Promise<CarsDTO[]> {
    const cars = await this.carsRepository.listCars();
    return cars;
  }
}


export { CarsListUseCase };
