import { ForgotPasswordUseCase } from './forgot-password';
import { TokenGenerator } from '../../../contracts/TokenGenerator';
import { IUsersRepository } from '../../../../shared/infra/database/interfaces/IUserRepository';
import { NotFoundError } from '../../../../shared/infra/http/errors/not-found';

interface SutTypes {
  sut: ForgotPasswordUseCase
  usersRepositoryStub: jest.Mocked<IUsersRepository>
  tokenGeneratorStub: jest.Mocked<TokenGenerator>
}

const fakeUserResponse = {
  id: 'any_id',
  username: 'any_username',
  token: 'any_token',
};

const fakeRequest = {
  username: 'any_username',
};

const makeSut = (): SutTypes => {
  const usersRepositoryStub: jest.Mocked<IUsersRepository> = {
    create: jest.fn().mockResolvedValue(null),
    findByUsername: jest.fn().mockResolvedValue(fakeUserResponse),
    findByPhoneNumber: jest.fn().mockResolvedValue(null),
    findById: jest.fn().mockResolvedValue(null)
  };

  const tokenGeneratorStub: jest.Mocked<TokenGenerator> = {
    generate: jest.fn().mockResolvedValue('any_token')
  };

  const sut = new ForgotPasswordUseCase(
    usersRepositoryStub,
    tokenGeneratorStub
  );

  return { sut, usersRepositoryStub, tokenGeneratorStub };
};

describe('Forgot Password Use Case test', () => {
  it('should throw NotFound if users does not exists', async () => {
    const { sut, usersRepositoryStub } = makeSut();
    usersRepositoryStub.findByUsername.mockResolvedValueOnce(null);

    const promise = sut.execute(fakeRequest);

    await expect(promise).rejects.toThrow(NotFoundError);
  });

  it('should generete a forgot password token', async () => {
    const { sut, tokenGeneratorStub } = makeSut();

    await sut.execute(fakeRequest);

    expect(tokenGeneratorStub.generate).toHaveBeenCalledWith({
      id: fakeUserResponse.id,
      username: fakeUserResponse.username,
      token: fakeUserResponse.token
    });

  });
});
