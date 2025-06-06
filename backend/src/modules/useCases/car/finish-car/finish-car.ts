import { ICarsRepository } from '../../../../shared/infra/database/interfaces/ICarsRepository';
import { NotFoundError } from '../../../../shared/infra/http/errors/not-found';
import { CarsDTO } from '../dtos';

class FinishCarUseCase {
  constructor(private readonly carsRepository: ICarsRepository) { }

  async execute(id: string, user: string): Promise<CarsDTO> {
    const car = await this.carsRepository.getCarById(id);

    if (!car || car.userId !== user) {
      throw new NotFoundError('You not owner of this car');
    }

    return this.carsRepository.finishCar(id, user);

  }

}

export { FinishCarUseCase };
