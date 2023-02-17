import { Router } from 'express';
import { adaptRoute } from '../../config/adapter';
import { authenticate } from '../../middlewares/authenticate';
import { makeCreateCarController } from '../../../factories/create-car';


const createCarRouter = Router();

createCarRouter.post('/', authenticate, adaptRoute(makeCreateCarController()));


export { createCarRouter };
