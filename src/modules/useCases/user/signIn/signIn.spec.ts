
import { IUsersRepository } from '../../../../shared/infra/database/interfaces/IUserRepository';
import { NotFoundError } from '../../../../shared/infra/http/errors/not-found';
import { PasswordCompare } from '../../../contracts/PasswordCompare';
import { TokenGenerator } from '../../../contracts/TokenGenerator';
import { SignInUseCase } from './sign-in';

interface SutTypes {
  sut: SignInUseCase
  usersRepositoryStub: jest.Mocked<IUsersRepository>
  passwordCompareStub: jest.Mocked<PasswordCompare>
  tokenGeneratorStub: jest.Mocked<TokenGenerator>
}

const fakeUserResponse = {
  id: 'any_id',
  username: 'any_username',
  password: 'any_password',
  phone: '0000000',
  created_at: new Date(),
  updated_at: new Date(),
};


const fakeRequest = {
  username: 'any_username',
  password: 'any_password',
  phone: '0000000',
};


const makeSut = (): SutTypes => {
  const usersRepositoryStub: jest.Mocked<IUsersRepository> = {
    create: jest.fn().mockResolvedValue(null),
    findByUsername: jest.fn().mockResolvedValue(fakeUserResponse),
    findByPhoneNumber: jest.fn().mockResolvedValue(null)
  };
  const passwordCompareStub: jest.Mocked<PasswordCompare> = {
    compare: jest.fn().mockResolvedValue(true)
  };
  const tokenGeneratorStub: jest.Mocked<TokenGenerator> = {
    generate: jest.fn().mockResolvedValue('any_token')
  };

  const sut = new SignInUseCase(
    usersRepositoryStub,
    passwordCompareStub,
    tokenGeneratorStub
  );

  return { sut, usersRepositoryStub, passwordCompareStub, tokenGeneratorStub };
};

describe('SignIn User', () => {
  it('should call find with the correct value', async () => {
    const { sut, usersRepositoryStub } = makeSut();

    await sut.execute(fakeRequest);

    expect(usersRepositoryStub.findByUsername).toHaveBeenCalledWith(fakeRequest.username);
  });

  it('should throw NotFound if users does not exists', async () => {
    const { sut, usersRepositoryStub } = makeSut();
    usersRepositoryStub.findByUsername.mockResolvedValueOnce(null);

    const promise = sut.execute(fakeRequest);

    await expect(promise).rejects.toThrow(NotFoundError);
  });

  it('should call compare with the correct values', async () => {
    const { sut, passwordCompareStub } = makeSut();

    await sut.execute(fakeRequest);

    expect(passwordCompareStub.compare).toHaveBeenCalledWith(
      fakeRequest.password,
      fakeUserResponse.password
    );
  });

  it('should throw NotFound if password is invalid', async () => {
    const { sut, passwordCompareStub } = makeSut();
    passwordCompareStub.compare.mockResolvedValueOnce(false);

    const promise = sut.execute(fakeRequest);

    await expect(promise).rejects.toThrow(NotFoundError);
  });

  it('should call generate with the correct value', async () => {
    const { sut, tokenGeneratorStub } = makeSut();

    await sut.execute(fakeRequest);

    expect(tokenGeneratorStub.generate).toHaveBeenCalledWith({
      id: fakeUserResponse.id,
      username: fakeUserResponse.username,
    });
  });

  it('should return UserAccessData if login is succeed', async () => {
    const { sut } = makeSut();

    const userData = await sut.execute(fakeRequest);

    expect(userData).toEqual({
      username: fakeUserResponse.username,
      token: 'any_token'
    });
  });


});


