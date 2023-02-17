import request from 'supertest';
import { authenticate } from './authenticate';
import jwt from 'jsonwebtoken';
import { app } from '../config/app';
import { Payload } from '../../../../modules/contracts/TokenGenerator';

const SECRET = 'dsadasd';

const payload: Payload = {
  id: '1',
  username: 'any_username',
};

describe('Authenticate Middleware test', () => {
  app.get('/test-auth', authenticate, (request, response) => {
    response.send(request.user);
  });

  it('should response with 401 if token is invalid token', async () => {
    const token = 'invalid_token';

    await request(app).get('/test-auth').set('Authorization', token).expect(401);
  });

  it('should response with 401 if token is not provided', async () => {
    await request(app).get('/test-auth').expect(401);
  });

  it('should response with 200 if token is valid', async () => {
    const token = jwt.sign({ data: payload }, SECRET);
    await request(app).get('/test-auth').set('Authorization', token).expect(200);
  });
});
