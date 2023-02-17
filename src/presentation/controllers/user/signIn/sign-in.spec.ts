import { SingIn } from './sing-in';
import { RequestValidator } from '../../../contracts/RequestValidator';
import { InvalidRequestError } from '../../../../shared/infra/http/errors/invalid-request';
import { SignInUseCase } from '../../../../modules/useCases/user/signIn/sign-in';

const fakeUserDataAccess = {
  id: 'any_id',
  username: 'any_username',
  token: 'any_token'
};

const fakeRequest = {
  body: {
    username: 'any_username',
    password: 'any_password'
  }
};

type SutTypes = {
  sut: SingIn
  signInStub: jest.Mocked<SignInUseCase>
  requestValidator: jest.Mocked<RequestValidator>
};

const makeSut = (): SutTypes => {
  const signInStub: jest.Mocked<SignInUseCase> = {
    execute: jest.fn().mockResolvedValue(fakeUserDataAccess)
  } as any;
  const requestValidator: jest.Mocked<RequestValidator> = {
    validate: jest.fn().mockResolvedValue(true)
  };

  const sut = new SingIn(signInStub, requestValidator);

  return { sut, signInStub, requestValidator };
};

describe('Sign-in controller test', () => {
  it('should call validate with correct values', async () => {
    const { sut, requestValidator } = makeSut();

    await sut.handle(fakeRequest);

    expect(requestValidator.validate).toHaveBeenCalledWith(fakeRequest.body);
  });

  it('should throw an invalid request exception if data is invalid', async () => {
    const { sut, requestValidator } = makeSut();
    requestValidator.validate.mockResolvedValueOnce(false);

    const promise = sut.handle(fakeRequest);

    await expect(promise).rejects.toThrowError(InvalidRequestError);
  });

  it('should call execute with correct values', async () => {
    const { sut, signInStub } = makeSut();

    await sut.handle(fakeRequest);

    expect(signInStub.execute).toHaveBeenCalledWith(fakeRequest.body);
  });

  it('should return statusCode 201 and the user data if data is valid', async () => {
    const { sut } = makeSut();

    const response = await sut.handle(fakeRequest);

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(fakeUserDataAccess);
  });
});
