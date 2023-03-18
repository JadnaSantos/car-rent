import express from 'express';
import { cors } from '../middlewares/cors';
import { routes } from '../routes';
import path from 'path';

import swaggerFile from '../../http/swagger.json';
import swaggerUi from 'swagger-ui-express';

const app = express();
app.use(express.json());
app.use(cors);
app.use(routes);
app.use('/files', express.static(path.join(__dirname, '..', 'uploads')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup());




export { app };
