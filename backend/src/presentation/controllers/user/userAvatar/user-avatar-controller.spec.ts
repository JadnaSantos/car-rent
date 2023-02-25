import { UserAvatarUseCase } from '../../../../modules/useCases/user/userAvatar/user-avatar';
import { HttpRequest } from '../../../contracts/Http';
import { UserAvatarController } from './user-avatar-controller';

const fakeUser = {
  id: '1',
  username: 'any_username',
  password: 'any_password',
  phone: '11942384716',
  created_at: new Date(),
  updated_at: new Date(),
};

type SutTypes = {
  sut: UserAvatarController
  userAvatarStubUseCase: jest.Mocked<UserAvatarUseCase>
};

const makeSut = (): SutTypes => {
  const userAvatarStubUseCase: jest.Mocked<UserAvatarUseCase> = {
    execute: jest.fn().mockResolvedValue(fakeUser)
  } as any;

  const sut = new UserAvatarController(userAvatarStubUseCase);

  return { sut, userAvatarStubUseCase };
};

describe('Sign-in controller test', () => {
  const httpRequest: HttpRequest = {
    body: {},
    user: { id: '01', username: 'username' },
  };

  it('should be able to get user by id', async () => {
    const { sut } = makeSut();

    const response = await sut.handle(httpRequest);

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(fakeUser);
  });
});

