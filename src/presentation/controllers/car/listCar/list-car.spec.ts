import { Prisma } from '@prisma/client';
import { CarsDTO } from '../../../../modules/useCases/car/dtos';
import { ListCarsUseCase } from '../../../../modules/useCases/car/listCars/list-cars';
import { HttpRequest } from '../../../contracts/Http';
import { ListCarsController } from './list-car-controller';

interface SutTypes {
  sut: ListCarsController
  listCarSubUseCaseStub: jest.Mocked<ListCarsUseCase>
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
    userId: '1'
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
    userId: '2'
  },
];

const makeSut = (): SutTypes => {
  const listCarSubUseCaseStub: jest.Mocked<ListCarsUseCase> = {
    execute: jest.fn().mockResolvedValue(fakeCarsReponse),
  } as any;

  const sut = new ListCarsController(listCarSubUseCaseStub);

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
