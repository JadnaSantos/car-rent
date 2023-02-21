import { Prisma } from '@prisma/client';
import { CarsRepository } from '../../../../shared/infra/database/repositories/cars-respository';
import { NotFoundError } from '../../../../shared/infra/http/errors/not-found';
import { FinishCarsUseCase } from './finish-car';

interface SutTypes {
  sut: FinishCarsUseCase
  carRepositorySub: jest.Mocked<CarsRepository>
}

const fakeUser = {
  id: '001',
  username: 'any_username',
  password: 'any_password',
  phone: '11942384716',
  created_at: new Date(),
  updated_at: new Date(),
};


const fakeRequest = {
  id: '01',
  name: 'any_name',
  banner: '000000000',
  description: 'any_description',
  brand: 'any_brand',
  kilometers: 'any_kilometers',
  price: new Prisma.Decimal(1000),
  userId: '001',
  year: '2020-19-05',
  status: true,
  draft: true
};


const makeSut = (): SutTypes => {
  const carRepositorySub: jest.Mocked<CarsRepository> = {
    create: jest.fn().mockResolvedValue(null),
    deleteCar: jest.fn().mockResolvedValue(null),
    listCars: jest.fn().mockResolvedValue(null),
    updateCar: jest.fn().mockResolvedValue(null),
    getCarById: jest.fn().mockResolvedValue(null),
    finishCar: jest.fn().mockResolvedValue(fakeRequest)

  };

  const sut = new FinishCarsUseCase(carRepositorySub);

  return { sut, carRepositorySub };
};

describe('Finish Car use case', () => {
  it('should to able uptdate car status', async () => {
    const { sut } = makeSut();

    await sut.execute(fakeRequest.id, fakeUser.id);

    expect(fakeRequest.status).toBeTruthy();
  });

  it('should not be able to upated status car if user is not owner', async () => {

    const { sut, carRepositorySub } = makeSut();

    await carRepositorySub.finishCar(fakeRequest.userId, fakeUser.id);

    expect(sut.execute('03', '01')).rejects.toThrow(NotFoundError);
  });
});



