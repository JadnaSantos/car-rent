import { Router } from 'express';
import { adaptRoute } from '../../config/adapter';
import { makeCreateCarController } from '../../../factories/create-car';


const createCarRouter = Router();

createCarRouter.post('/', adaptRoute(makeCreateCarController()));


export { createCarRouter };
