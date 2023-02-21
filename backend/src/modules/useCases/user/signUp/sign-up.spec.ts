
import { SignUpUseCase } from './sign-up';
import { PasswordEncrypter } from '../../../contracts/PasswordEncrypter';
import { ConflictError } from '../../../../shared/infra/http/errors/conflict';
import { IUsersRepository } from '../../../../shared/infra/database/interfaces/IUserRepository';

interface SutTypes {
  sut: SignUpUseCase
  usersRepositoryStub: jest.Mocked<IUsersRepository>
  passwordEncrypterStub: jest.Mocked<PasswordEncrypter>
}

const fakeUser = {
  id: '1',
  username: 'any_username',
  password: 'any_password',
  phone: '11942384716',
  created_at: new Date(),
  updated_at: new Date(),
};

const fakeRequest = {
  username: 'any_username',
  password: 'any_password',
  phone: '11942384716',
  created_at: new Date(),
  updated_at: new Date(),
};

const makeSut = (): SutTypes => {
  const usersRepositoryStub: jest.Mocked<IUsersRepository> = {
    create: jest.fn().mockResolvedValue(fakeUser),
    findByUsername: jest.fn().mockResolvedValue(null),
    findByPhoneNumber: jest.fn().mockResolvedValue(null)
  };

  const passwordEncrypterStub: jest.Mocked<PasswordEncrypter> = {
    encrypt: jest.fn().mockResolvedValue('hashed_password')
  };

  const sut = new SignUpUseCase(
    usersRepositoryStub,
    passwordEncrypterStub
  );

  return { sut, usersRepositoryStub, passwordEncrypterStub };
};


describe('SignUp User', () => {
  it('should call find with the correct value ', async () => {
    const { sut, usersRepositoryStub } = makeSut();
    const findSpy = jest.spyOn(usersRepositoryStub, 'findByUsername');

    await sut.execute(fakeRequest);

    expect(findSpy).toHaveBeenCalledWith(fakeRequest.username);
  });

  it('should throw an error if user already exists', async () => {
    const { sut, usersRepositoryStub } = makeSut();
    usersRepositoryStub.findByUsername.mockResolvedValueOnce(fakeUser);

    const promise = sut.execute(fakeRequest);

    await expect(promise).rejects.toThrow(ConflictError);
  });

  it('should throw an error if phoneNumber already exists', async () => {
    const { sut, usersRepositoryStub } = makeSut();
    usersRepositoryStub.findByPhoneNumber.mockResolvedValueOnce(fakeUser);

    const promise = sut.execute(fakeRequest);

    await expect(promise).rejects.toThrow(ConflictError);
  });

  it('should call encrypt with the correct value ', async () => {
    const { sut, passwordEncrypterStub } = makeSut();
    const encryptSpy = jest.spyOn(passwordEncrypterStub, 'encrypt');

    await sut.execute(fakeRequest);

    expect(encryptSpy).toHaveBeenCalledWith(fakeRequest.password);
  });

  it('should call add user with the correct values ', async () => {
    const { sut, usersRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(usersRepositoryStub, 'create');

    await sut.execute(fakeRequest);

    expect(addSpy).toHaveBeenCalledWith({
      username: fakeRequest.username,
      password: 'hashed_password',
      phone: fakeRequest.phone
    });
  });


  it('should return the created user', async () => {
    const { sut } = makeSut();

    const user = await sut.execute(fakeRequest);

    expect(user).toEqual({
      id: '1',
      username: fakeRequest.username,
      password: fakeRequest.password,
      phone: fakeRequest.phone,
      created_at: fakeRequest.created_at,
      updated_at: fakeRequest.updated_at,
    });
  });


});


