import { JwtTokenGenerator } from './JwtTokenGenerator';
import jwt from 'jsonwebtoken';
import { Payload } from '../../../../modules/contracts/TokenGenerator';

const SECRET = 'dsadasd';

const payload = {
  id: '1',
  username: 'any_username'
};

describe('TokenGenerator tests', () => {
  const tokenGenerator = new JwtTokenGenerator();

  it('Should generate a token with the correct data', async () => {
    const token = await tokenGenerator.generate(payload);

    const { data } = jwt.verify(token, SECRET) as { data: Payload };

    expect(data).toEqual(payload);
  });

  it('Should throw an error if jwt throws', async () => {
    jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
      throw new Error();
    });

    await expect(tokenGenerator.generate(payload)).rejects.toThrow();
  });
});
