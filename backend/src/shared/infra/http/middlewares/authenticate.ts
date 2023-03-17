import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import 'dotenv/config';

// const SECRET = 'dsadasd';

type Payload = {
  id: string;
  username: string
};

const authenticate = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  const authHeader = request.headers.authorization;

  if (!authHeader) return response.status(401).json({ message: 'Token not found' });


  const [, token] = authHeader.split(' ');

  try {
    const { data } = verify(token, 'cc8d283061c365329579fa4ace208d80') as { data: Payload };

    request.user = data;

    next();
  } catch (err) {
    return response.status(401).json({ message: 'Token invalid' });
  }
};

export { authenticate };
