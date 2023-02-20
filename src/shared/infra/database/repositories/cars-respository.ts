import { Car } from '@prisma/client';
import { CarsDTO } from '../../../../modules/useCases/car/dtos';
import { ICarsRepository } from '../interfaces/ICarsRepository';
import { prisma } from '../prisma/config';

class CarsRepository implements ICarsRepository {

  async create(data: CarsDTO): Promise<Car> {
    const car = await prisma.car.create({
      data: {
        name: data.name,
        year: data.year,
        description: data.description,
        brand: data.brand,
        banner: data.banner,
        price: data.price,
        kilometers: data.kilometers,
        userId: data.userId,
      },
      include: {
        user: true
      }
    });

    return car;
  }

  async listCars(): Promise<Car[]> {
    const cars = await prisma.car.findMany({
      include: {
        user: {
          select: {
            username: true,
            phone: true,
          }
        }
      }
    });

    return cars;
  }

  async deleteCar(id: string): Promise<Car> {
    const car = await prisma.car.delete({
      where: { id }
    });

    return car;
  }

  async updateCar(data: CarsDTO): Promise<Car> {
    const {
      id,
      name,
      year,
      description,
      brand,
      banner,
      price,
      kilometers,
      userId
    } = data;

    const car = await prisma.car.update({
      where: {
        id: id
      },
      data: {
        name,
        year,
        description,
        brand,
        banner,
        price,
        kilometers,
        userId
      },
      include: {
        user: true,
      }
    });

    return car;
  }

  async getCarById(id: string): Promise<Car | null> {
    const car = await prisma.car.findUnique({
      where: {
        id
      },
      select: {
        id: true,
        name: true,
        year: true,
        description: true,
        brand: true,
        banner: true,
        price: true,
        kilometers: true,
        userId: true
      }
    });

    return car;
  }
}

export { CarsRepository };
