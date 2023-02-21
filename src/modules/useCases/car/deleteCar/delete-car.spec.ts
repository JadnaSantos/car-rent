import { Prisma } from '@prisma/client';
import { CarsRepository } from '../../../../shared/infra/database/repositories/cars-respository';
import { NotFoundError } from '../../../../shared/infra/http/errors/not-found';
import { DeleteCarUseCase } from './delete-car';

interface SutTypes {
  sut: DeleteCarUseCase
  deleteCarRepositorySub: jest.Mocked<CarsRepository>
}

const fakeCarsReponse = {
  id: '00',
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
};


const makeSut = (): SutTypes => {
  const deleteCarRepositorySub: jest.Mocked<CarsRepository> = {
    getCarById: jest.fn().mockResolvedValue(null),
    listCars: jest.fn().mockResolvedValue(null),
    create: jest.fn().mockResolvedValue(null),
    deleteCar: jest.fn().mockResolvedValue(fakeCarsReponse),
    updateCar: jest.fn().mockResolvedValue(null),
    finishCar: jest.fn().mockResolvedValue(null)
  };

  const sut = new DeleteCarUseCase(deleteCarRepositorySub);

  return { sut, deleteCarRepositorySub };
};

describe('Details Car use case test', () => {
  it('should be able to delete car by id', async () => {
    const { sut, deleteCarRepositorySub } = makeSut();

    await sut.execute('00', '1');

    expect(deleteCarRepositorySub.deleteCar).toHaveBeenCalledWith('00');
  });


  it('should not be able to delete car if user is not owner of car', async () => {
    const { sut, deleteCarRepositorySub } = makeSut();

    deleteCarRepositorySub.deleteCar.mockResolvedValueOnce(fakeCarsReponse);

    await expect(sut.execute('00', '2')).rejects.toThrow(NotFoundError);
  });
});


