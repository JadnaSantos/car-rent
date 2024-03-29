import { Prisma } from '@prisma/client';
import { RemoveCarController } from './remove-car-controller';
import { RemoveCarUseCase } from '../../../../modules/useCases/car/remove-car/remove-car';
import { HttpRequest } from '../../../contracts/Http';

interface SutTypes {
  sut: RemoveCarController
  deleteCarSubUseCaseStub: jest.Mocked<RemoveCarUseCase>
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
  const deleteCarSubUseCaseStub: jest.Mocked<RemoveCarUseCase> = {
    execute: jest.fn().mockResolvedValue(fakeCarsReponse),
  } as any;

  const sut = new RemoveCarController(deleteCarSubUseCaseStub);

  return { sut, deleteCarSubUseCaseStub };
};


describe('Delete Controller test', () => {
  const httpRequest: HttpRequest = {
    body: {},
    params: { id: '1' },
    user: { id: '1', username: 'username' }
  };
  it('should return statusCode 200 and message sucess', async () => {
    const { sut } = makeSut();

    const response = await sut.handle(httpRequest);

    expect(response).toEqual({
      statusCode: 200,
      body: { message: 'Car deleted' }
    });
  });
});
