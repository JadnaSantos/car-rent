import express from 'express';
import { cors } from '../middlewares/cors';
import { routes } from '../routes';
import path from 'path';

const app = express();
app.use(express.json());
app.use(cors);
app.use(routes);
app.use('/files', express.static(path.join(__dirname, '..', 'uploads')));


export { app };
