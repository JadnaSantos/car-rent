import { Car } from '@prisma/client';
import { CarsDTO } from '../../../../modules/useCases/car/dtos';

interface ICarsRepository {
  create: (data: CarsDTO) => Promise<Car>
  listCars: () => Promise<Car[]>
  deleteCar: (id: string) => Promise<Car>
  updateCar: (data: CarsDTO) => Promise<Car>
  getCarById: (id: string) => Promise<Car | null>
}

export { ICarsRepository };
