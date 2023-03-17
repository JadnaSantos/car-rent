import { NewCarUseCase } from './new-car';
import { CarsRepository } from '../../../../shared/infra/database/repositories/cars-respository';
import { CarsDTO } from '../dtos';
import { Prisma } from '@prisma/client';

interface SutTypes {
  sut: NewCarUseCase
  carRepositorySub: jest.Mocked<CarsRepository>
}

const fakeUser = {
  id: '1',
  username: 'any_username',
  password: 'any_password',
  phone: '11942384716',
  created_at: new Date(),
  updated_at: new Date(),
};

const fakeRequest: CarsDTO = {
  name: 'any_name',
  banner: '000000000',
  description: 'any_description',
  brand: 'any_brand',
  kilometers: 'any_kilometers',
  price: new Prisma.Decimal(1000),
  userId: 'user_id',
  year: '2020-19-05',
  status: false,
  draft: true
};


const makeSut = (): SutTypes => {
  const carRepositorySub: jest.Mocked<CarsRepository> = {
    create: jest.fn().mockResolvedValue(fakeRequest),
    deleteCar: jest.fn().mockResolvedValue(null),
    listCars: jest.fn().mockResolvedValue(null),
    updateCar: jest.fn().mockResolvedValue(null),
    getCarById: jest.fn().mockResolvedValue(null),
    finishCar: jest.fn().mockResolvedValue(null)

  };

  const sut = new NewCarUseCase(carRepositorySub);

  return { sut, carRepositorySub };
};

describe('Create Car use case', () => {
  it('should return the created car', async () => {
    const { sut } = makeSut();

    const car = await sut.execute(fakeRequest);

    expect(car).toEqual({
      name: fakeRequest.name,
      banner: fakeRequest.banner,
      description: fakeRequest.description,
      brand: fakeRequest.brand,
      kilometers: fakeRequest.kilometers,
      price: fakeRequest.price,
      userId: fakeRequest.userId,
      year: fakeRequest.year,
      status: fakeRequest.status,
      draft: fakeRequest.draft
    });
  });
});
