import { Prisma } from '@prisma/client';
import { DetailsCarUseCase } from '../../../../modules/useCases/car/detailsCar/details-car';
import { CarsDTO } from '../../../../modules/useCases/car/dtos';
import { HttpRequest } from '../../../contracts/Http';
import { DetailsCarController } from './details-controller-car';


interface SutTypes {
  sut: DetailsCarController
  detailsCarSubUseCaseStub: jest.Mocked<DetailsCarUseCase>
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
  const detailsCarSubUseCaseStub: jest.Mocked<DetailsCarUseCase> = {
    execute: jest.fn().mockResolvedValue(fakeCarsReponse)
  } as any;

  const sut = new DetailsCarController(detailsCarSubUseCaseStub);

  return { sut, detailsCarSubUseCaseStub };
};

describe('DetailsCar controller test', () => {
  const httpRequest: HttpRequest = {
    body: {},
    user: { id: '01', username: 'username' },
    params: { id: '02' }
  };

  it('should be able to get car by Id', async () => {
    const { sut } = makeSut();

    const response = await sut.handle(httpRequest);

    expect(response).toEqual({
      statusCode: 200,
      body: fakeCarsReponse
    });
  });


  it('shoulf throw if car id throws', async () => {
    const { sut, detailsCarSubUseCaseStub } = makeSut();
    detailsCarSubUseCaseStub.execute.mockRejectedValueOnce(new Error());

    await expect(sut.handle(httpRequest)).rejects.toThrow();
  });
});


