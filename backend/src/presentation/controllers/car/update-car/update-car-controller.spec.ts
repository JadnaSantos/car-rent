import { Prisma } from '@prisma/client';
import { UpdateCarUseCase } from '../../../../modules/useCases/car/update-car/update-car';
import { HttpRequest } from '../../../contracts/Http';
import { UpdateCarController } from './update-car-controller';

interface SutTypes {
  sut: UpdateCarController
  updateCarSubUseCaseStub: jest.Mocked<UpdateCarUseCase>
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
  userId: '1',
  status: false,
  draft: false
};


const makeSut = (): SutTypes => {
  const updateCarSubUseCaseStub: jest.Mocked<UpdateCarUseCase> = {
    execute: jest.fn().mockResolvedValue(fakeCarsReponse)
  } as any;

  const sut = new UpdateCarController(updateCarSubUseCaseStub);

  return { sut, updateCarSubUseCaseStub };
};

describe('Update Car controller test', () => {
  const httpRequest: HttpRequest = {
    body: {},
    user: { id: '01', username: 'username' },
  };

  it('should be able to update car', async () => {
    const { sut } = makeSut();

    const response = await sut.handle(httpRequest);

    expect(response).toEqual({
      statusCode: 200,
      body: fakeCarsReponse
    });
  });


  it('shoulf throw if car id throws', async () => {
    const { sut, updateCarSubUseCaseStub } = makeSut();
    updateCarSubUseCaseStub.execute.mockRejectedValueOnce(new Error());

    await expect(sut.handle(httpRequest)).rejects.toThrow();
  });
});


