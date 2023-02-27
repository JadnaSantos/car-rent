import { UserAvatarUseCase } from './user-avatar';
import { IUsersRepository } from '../../../../shared/infra/database/interfaces/IUserRepository';
import { NotFoundError } from '../../../../shared/infra/http/errors/not-found';

interface SutTypes {
  sut: UserAvatarUseCase
  userAvatarRepositoryStub: jest.Mocked<IUsersRepository>
}


const fakeUser = {
  id: '1',
  username: 'any_username',
  password: 'any_password',
  phone: '11942384716',
  created_at: new Date(),
  updated_at: new Date(),
};

const fakeUserAvatar = {
  user_id: fakeUser.id,
  avatar_filename: 'any_avatar.jpg',
};

const makeSut = (): SutTypes => {
  const userAvatarRepositoryStub: jest.Mocked<IUsersRepository> = {
    create: jest.fn().mockResolvedValue(null),
    findByUsername: jest.fn().mockResolvedValue(null),
    findByPhoneNumber: jest.fn().mockResolvedValue(null),
    findById: jest.fn().mockResolvedValue(fakeUser)
  };

  const sut = new UserAvatarUseCase(
    userAvatarRepositoryStub,
  );

  return { sut, userAvatarRepositoryStub };
};

describe('User Avatar Use Case test', () => {
  it('should be able to update user avatar', async () => {
    const { sut } = makeSut();

    const userData = await sut.execute({
      user_id: fakeUser.id,
      avatarFileName: fakeUserAvatar.avatar_filename
    });

    expect(userData.avatar).toBe('any_avatar.jpg');
  });


  it('should throw NotFound if user does not exist', async () => {
    const { sut, userAvatarRepositoryStub } = makeSut();

    userAvatarRepositoryStub.findById.mockResolvedValueOnce(null);

    await expect(
      sut.execute({
        user_id: '2',
        avatarFileName: fakeUserAvatar.avatar_filename
      }),
    ).rejects.toThrow(NotFoundError);
  });
});
