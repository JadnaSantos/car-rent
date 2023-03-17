import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { Payload, TokenGenerator } from '../../../../modules/contracts/TokenGenerator';

export class JwtTokenGenerator implements TokenGenerator {
  private readonly config: jwt.SignOptions;
  private readonly jwtSecret = 'cc8d283061c365329579fa4ace208d80';
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
