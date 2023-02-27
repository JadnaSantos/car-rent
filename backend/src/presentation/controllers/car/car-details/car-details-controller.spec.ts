import { Prisma } from '@prisma/client';
import { CarDetailsUseCase } from '../../../../modules/useCases/car/car-details/car-details';
import { CarsDTO } from '../../../../modules/useCases/car/dtos';
import { HttpRequest } from '../../../contracts/Http';
import { CarDetailsController } from './car-details-controller';


interface SutTypes {
  sut: CarDetailsController
  detailsCarSubUseCaseStub: jest.Mocked<CarDetailsUseCase>
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
  const detailsCarSubUseCaseStub: jest.Mocked<CarDetailsUseCase> = {
    execute: jest.fn().mockResolvedValue(fakeCarsReponse)
  } as any;

  const sut = new CarDetailsController(detailsCarSubUseCaseStub);

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


