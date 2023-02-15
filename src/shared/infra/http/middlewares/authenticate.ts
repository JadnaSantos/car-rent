import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import 'dotenv/config';

const SECRET = '10a6d97cff0c4d0ebdc458d1d74d4524';

type Payload = {
  id: string
  username: string
};


const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'Token not found' });

  try {
    const { data } = verify(token, SECRET) as { data: Payload };

    req.user = data;

    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalid' });
  }
};

export { authenticate };
