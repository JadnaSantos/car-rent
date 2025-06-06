import { CarsDTO } from '../dtos';
import { ICarsRepository } from '../../../../shared/infra/database/interfaces/ICarsRepository';
import { NotFoundError } from '../../../../shared/infra/http/errors/not-found';

class RemoveCarUseCase {
  constructor(
    private readonly deleteCarRepository: ICarsRepository,
  ) { }

  async execute(id: string, userId: string): Promise<CarsDTO> {
    const car = await this.deleteCarRepository.getCarById(id);

    if (!car || car.userId !== userId) {
      throw new NotFoundError('You not owner of this car');
    }

    return this.deleteCarRepository.deleteCar(id);

  }

}

export { RemoveCarUseCase };
