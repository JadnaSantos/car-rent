import { CarsDTO } from '../dtos';
import { Prisma } from '@prisma/client';
import { DetailsCarUseCase } from './details-car';
import { CarsRepository } from '../../../../shared/infra/database/repositories/cars-respository';
import { NotFoundError } from '../../../../shared/infra/http/errors/not-found';


interface SutTypes {
  sut: DetailsCarUseCase
  detailsCarRepositorySub: jest.Mocked<CarsRepository>
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
  const detailsCarRepositorySub: jest.Mocked<CarsRepository> = {
    getCarById: jest.fn().mockResolvedValue(fakeCarsReponse),
    listCars: jest.fn().mockResolvedValue(null),
    create: jest.fn().mockResolvedValue(null),
    deleteCar: jest.fn().mockResolvedValue(null),
    updateCar: jest.fn().mockResolvedValue(null),
    finishCar: jest.fn().mockResolvedValue(null)
  };

  const sut = new DetailsCarUseCase(detailsCarRepositorySub);

  return { sut, detailsCarRepositorySub };
};


describe('Details Car use case test', () => {
  it('should be able to get list by id', async () => {
    const { sut, detailsCarRepositorySub } = makeSut();

    await sut.execute('02');

    expect(detailsCarRepositorySub.getCarById).toHaveBeenCalledWith('02');
  });

  it('should not be able to details car if id does not exist', async () => {
    const { sut, detailsCarRepositorySub } = makeSut();

    detailsCarRepositorySub.getCarById.mockResolvedValueOnce(null);


    expect(sut.execute('010')).rejects.toThrow(NotFoundError);
  });
});
