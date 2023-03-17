import { SignUpUseCase } from '../../../../modules/useCases/user/sign-up/sign-up';
import { InvalidRequestError } from '../../../../shared/infra/http/errors/invalid-request';
import { RequestValidator } from '../../../contracts/RequestValidator';
import { SingUp } from './sign-up';

const fakeResponse = {
  statusCode: 201,
  body: {
    id: 'any_id',
    username: 'any_username',
  }
};

const fakeRequest = {
  body: {
    id: 'any_id',
    username: 'any_username',
  },
  file: 'any_file'
};

type SutTypes = {
  sut: SingUp
  createUserStub: jest.Mocked<SignUpUseCase>
  requestValidatorStub: jest.Mocked<RequestValidator>
};

const makeSut = (): SutTypes => {
  const createUserStub: jest.Mocked<SignUpUseCase> = {
    execute: jest.fn().mockResolvedValue(fakeResponse.body)
  } as any;
  const requestValidatorStub: jest.Mocked<RequestValidator> = {
    validate: jest.fn().mockResolvedValue(true)
  };
  const sut = new SingUp(createUserStub, requestValidatorStub);

  return { sut, createUserStub, requestValidatorStub };
};

describe('Signup controller test', () => {
  it('should call validate with request body', async () => {
    const { sut, requestValidatorStub } = makeSut();
    const validateSpy = jest.spyOn(requestValidatorStub, 'validate');

    await sut.handle(fakeRequest);

    expect(validateSpy).toHaveBeenCalledWith(fakeRequest.body);
  });

  it('should throw a invalidRequest if request is invalid', async () => {
    const { sut, requestValidatorStub } = makeSut();
    requestValidatorStub.validate.mockResolvedValueOnce(false);

    const promise = sut.handle(fakeRequest);

    await expect(promise).rejects.toThrowError(InvalidRequestError);
  });

  it('should call createUser with request body', async () => {
    const { sut, createUserStub } = makeSut();
    const executeSpy = jest.spyOn(createUserStub, 'execute');

    await sut.handle(fakeRequest);

    expect(executeSpy).toHaveBeenCalledWith(fakeRequest.body);
  });

  it('should return created with statusCode 201 if request is valid', async () => {
    const { sut } = makeSut();

    const response = await sut.handle(fakeRequest);

    expect(response).toEqual(fakeResponse);
  });
});
