import { Prisma } from '@prisma/client';
import { CarsDTO } from '../../../../modules/useCases/car/dtos';
import { CarsListUseCase } from '../../../../modules/useCases/car/car-list/cars-list';
import { CarsListController } from './car-list-controller';

interface SutTypes {
  sut: CarsListController
  listCarSubUseCaseStub: jest.Mocked<CarsListUseCase>
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
  const listCarSubUseCaseStub: jest.Mocked<CarsListUseCase> = {
    execute: jest.fn().mockResolvedValue(fakeCarsReponse),
  } as any;

  const sut = new CarsListController(listCarSubUseCaseStub);

  return { sut, listCarSubUseCaseStub };
};

describe('ListCar Controller test', () => {
  it('should return statusCode 200 and array of cars on body', async () => {
    const { sut } = makeSut();

    const response = await sut.handle();

    expect(response).toEqual({
      statusCode: 200,
      body: fakeCarsReponse
    });
  });
});
