import { Prisma } from '@prisma/client';
import { FinishCarController } from './finish-controller-car';
import { FinishCarsUseCase } from '../../../../modules/useCases/car/finishCar/finish-car';
import { HttpRequest } from '../../../contracts/Http';

interface SutTypes {
  sut: FinishCarController
  finishCarSubUseCaseStub: jest.Mocked<FinishCarsUseCase>
}

const fakeCarsReponse =
{
  id: '01',
  name: 'Porsche Macan',
  year: '2020-19-05',
  description: 'Carro lindo poucas vezes utilizado com o motor zerado',
  brand: 'Porsche',
  banner: '1676688033507-car-porsche.jpg',
  price: new Prisma.Decimal(1000),
  kilometers: '100',
  userId: '2',
  status: false,
  draft: false
};


const makeSut = (): SutTypes => {
  const finishCarSubUseCaseStub: jest.Mocked<FinishCarsUseCase> = {
    execute: jest.fn().mockResolvedValue(fakeCarsReponse)
  } as any;

  const sut = new FinishCarController(finishCarSubUseCaseStub);

  return { sut, finishCarSubUseCaseStub };
};

describe('Finish Car controller test', () => {
  const httpRequest: HttpRequest = {
    body: {},
    user: { id: '01', username: 'username' },
  };

  it('should be able to finish car', async () => {
    const { sut } = makeSut();

    const response = await sut.handle(httpRequest);

    expect(response).toEqual({
      statusCode: 200,
      body: fakeCarsReponse
    });
  });


  it('shoulf throw if car id throws', async () => {
    const { sut, finishCarSubUseCaseStub } = makeSut();
    finishCarSubUseCaseStub.execute.mockRejectedValueOnce(new Error());

    await expect(sut.handle(httpRequest)).rejects.toThrow();
  });
});


