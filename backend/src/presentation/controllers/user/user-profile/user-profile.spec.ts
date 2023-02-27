import { UserProfileController } from './user-profile-controller';
import { UserProfileUseCase } from '../../../../modules/useCases/user/user-profile/user-profile';
import { HttpRequest } from '../../../contracts/Http';

const fakeUser = {
  id: '1',
  username: 'any_username',
  password: 'any_password',
  phone: '11942384716',
  created_at: new Date(),
  updated_at: new Date(),
};


type SutTypes = {
  sut: UserProfileController
  profilleStubUseCase: jest.Mocked<UserProfileUseCase>
};

const makeSut = (): SutTypes => {
  const profilleStubUseCase: jest.Mocked<UserProfileUseCase> = {
    execute: jest.fn().mockResolvedValue(fakeUser)
  } as any;

  const sut = new UserProfileController(profilleStubUseCase);

  return { sut, profilleStubUseCase };
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
