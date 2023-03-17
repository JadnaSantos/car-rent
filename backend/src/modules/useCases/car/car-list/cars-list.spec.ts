import { CarsRepository } from '../../../../shared/infra/database/repositories/cars-respository';
import { CarsListUseCase } from './cars-list';
import { CarsDTO } from '../dtos';
import { Prisma } from '@prisma/client';

interface SutTypes {
  sut: CarsListUseCase
  carRepositorySub: jest.Mocked<CarsRepository>
}

const fakeCarsReponse: CarsDTO[] = [
  {
    id: '01',
    name: 'Porsche Macan',
    year: '2020-19-05',
    description: 'Carro lindo poucas vezes utilizado com o motor zerado',
    brand: 'Porsche',
    banner: '1676688033507-car-porsche.jpg',
    price: new Prisma.Decimal(1000),
    kilometers: '100',
    userId: '1',
    status: false,
    draft: true
  },
  {
    id: '02',
    name: 'Porsche Macan',
    year: '2020-19-05',
    description: 'Carro lindo poucas vezes utilizado com o motor zerado',
    brand: 'Porsche',
    banner: '1676688033507-car-porsche.jpg',
    price: new Prisma.Decimal(1000),
    kilometers: '100',
    userId: '2',
    status: false,
    draft: true
  },
];

const makeSut = (): SutTypes => {
  const carRepositorySub: jest.Mocked<CarsRepository> = {
    listCars: jest.fn().mockResolvedValue(fakeCarsReponse),
    create: jest.fn().mockResolvedValue(null),
    deleteCar: jest.fn().mockResolvedValue(null),
    updateCar: jest.fn().mockResolvedValue(null),
    getCarById: jest.fn().mockResolvedValue(null),
    finishCar: jest.fn().mockResolvedValue(null)
  };

  const sut = new CarsListUseCase(carRepositorySub);

  return { sut, carRepositorySub };
};

describe('List Cars use case test', () => {
  it('should return an array with cars', async () => {
    const { sut } = makeSut();

    const cars = await sut.execute();

    expect(cars).toEqual(fakeCarsReponse);
    expect(cars.length).toBe(2);
  });
});

