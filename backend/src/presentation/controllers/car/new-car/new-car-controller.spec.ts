import { Prisma } from '@prisma/client';
import { NewCarUseCase } from '../../../../modules/useCases/car/new-car/new-car';
import { InvalidRequestError } from '../../../../shared/infra/http/errors/invalid-request';
import { HttpRequest } from '../../../contracts/Http';
import { RequestValidator } from '../../../contracts/RequestValidator';
import { NewCarController } from './new-car-controller';

interface SutType {
  sut: NewCarController
  createCarUseCaseUseCaseStub: jest.Mocked<NewCarUseCase>
  requestValidatorStub: jest.Mocked<RequestValidator>
}

const makeSut = (): SutType => {
  const createCarUseCaseUseCaseStub: jest.Mocked<NewCarUseCase> = {
    execute: jest.fn()
  } as any;

  const requestValidatorStub: jest.Mocked<RequestValidator> = {
    validate: jest.fn().mockResolvedValue(true)
  };

  const sut = new NewCarController(createCarUseCaseUseCaseStub, requestValidatorStub);

  return { createCarUseCaseUseCaseStub, requestValidatorStub, sut };
};

describe('CreateCar Controller test ', () => {
  const httpRequest: HttpRequest = {
    body: {
      name: 'any_name',
      banner: '000000000',
      description: 'any_description',
      brand: 'any_brand',
      kilometers: 'any_kilometers',
      price: new Prisma.Decimal(1000),
      userId: 'user_id',
      year: '2020-19-05',
      status: false,
      draft: true
    },
    user: { id: 'user_id', username: 'any_username' },
    file: '000000000'
  };

  it('should call validate with the request body', async () => {
    const { sut, requestValidatorStub } = makeSut();

    await sut.handle(httpRequest);

    expect(requestValidatorStub.validate).toHaveBeenCalledWith(httpRequest.body);
  });


  it('should return 201 if createTransactionUseCase succeeds', async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual({
      statusCode: 201,
      body: { message: 'Car created' }
    });
  });

  it('Should throw if createCarUseCase throws', async () => {
    const { sut, createCarUseCaseUseCaseStub } = makeSut();
    createCarUseCaseUseCaseStub.execute.mockRejectedValueOnce(new Error());

    await expect(sut.handle(httpRequest)).rejects.toThrow();
  });


  it('should throw InvalidRequestError if validation fails', async () => {
    const httpRequestError: HttpRequest = {
      body: {
        name: 'any_name',
        banner: '000000000',
        description: 'any_description',
        brand: 'any_brand',
        kilometers: 'any_kilometers',
        price: new Prisma.Decimal(1000),
        years: '2020-19-05',
        userId: 'user_id',
        status: false,
        draft: true
      },
      user: { id: '1', username: 'any_username' },
      file: '000000000'
    };
    const { sut, requestValidatorStub } = makeSut();
    requestValidatorStub.validate.mockResolvedValue(false);

    await expect(sut.handle(httpRequestError)).rejects.toThrowError(InvalidRequestError);
  });

  it('should call createCarUseCase with the correct values', async () => {
    const { sut, createCarUseCaseUseCaseStub } = makeSut();

    await sut.handle(httpRequest);

    expect(createCarUseCaseUseCaseStub.execute).toHaveBeenCalledWith({
      name: httpRequest.body.name,
      banner: httpRequest.file,
      description: httpRequest.body.description,
      brand: httpRequest.body.brand,
      kilometers: httpRequest.body.kilometers,
      price: httpRequest.body.price,
      userId: httpRequest.user?.id,
      year: httpRequest.body.year,
      status: httpRequest.body.status,
      draft: httpRequest.body.draft,
    });
  });
});
