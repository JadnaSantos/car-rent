import { IUsersRepository } from '../../../../shared/infra/database/interfaces/IUserRepository';
import { NotFoundError } from '../../../../shared/infra/http/errors/not-found';
import { ProfilleUseCase } from './profille';

interface SutTypes {
  sut: ProfilleUseCase
  usersRepositoryStub: jest.Mocked<IUsersRepository>
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
  id: '1',
  username: 'any_username',
  password: 'any_password',
  phone: '11942384716',
  created_at: new Date(),
  updated_at: new Date(),
};



const makeSut = (): SutTypes => {
  const usersRepositoryStub: jest.Mocked<IUsersRepository> = {
    create: jest.fn().mockResolvedValue(null),
    findByUsername: jest.fn().mockResolvedValue(null),
    findByPhoneNumber: jest.fn().mockResolvedValue(null),
    findById: jest.fn().mockResolvedValue(fakeUser)
  };

  const sut = new ProfilleUseCase(
    usersRepositoryStub,
  );

  return { sut, usersRepositoryStub };
};

describe('Profille', () => {
  it('should be able to show user profiller', async () => {
    const { sut, usersRepositoryStub } = makeSut();

    await sut.execute(fakeRequest.id);

    expect(usersRepositoryStub.findById).toHaveBeenCalledWith(fakeRequest.id);

  });

  it('should throw NotFound if user does not existe', async () => {
    const { sut, usersRepositoryStub } = makeSut();

    usersRepositoryStub.findById.mockResolvedValueOnce(null);

    await expect(sut.execute('02')).rejects.toThrow(NotFoundError);
  });
});


