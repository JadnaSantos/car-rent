import { CarsDTO } from '../dtos';
import { ICarsRepository } from '../../../../shared/infra/database/interfaces/ICarsRepository';

class CreateCarUseCase {
  constructor(
    private readonly carsRepository: ICarsRepository
  ) { }

  async execute({
    name,
    year,
    description,
    brand,
    banner,
    price,
    kilometers,
    userId,
  }: CarsDTO) {

    const car = await this.carsRepository.create({
      name,
      year,
      description,
      brand,
      banner,
      price,
      kilometers,
      userId,
    });

    return car;
  }
}

export { CreateCarUseCase };
