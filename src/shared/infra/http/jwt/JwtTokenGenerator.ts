import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { Payload, TokenGenerator } from '../../../../modules/contracts/TokenGenerator';

export class JwtTokenGenerator implements TokenGenerator {
  private readonly config: jwt.SignOptions;
  private readonly jwtSecret = '10a6d97cff0c4d0ebdc458d1d74d4524';
  private readonly jwt: typeof jwt;

  constructor() {
    this.config = {
      expiresIn: '24h',
    };

    this.jwt = jwt;
  }

  generate = async (payload: Payload): Promise<string> => {
    return this.jwt.sign({ data: payload }, this.jwtSecret, this.config);
  };
}
