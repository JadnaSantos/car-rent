import { Router } from 'express';
import { adaptRoute } from '../../config/adapter';
import { authenticate } from '../../middlewares/authenticate';
import { makeCreateCarController } from '../../../factories/create-car';
import { makeListCarsController } from '../../../factories/list-cars';


const createCarRouter = Router();
const listCarRouter = Router();

createCarRouter.post('/', authenticate, adaptRoute(makeCreateCarController()));
listCarRouter.get('/', authenticate, adaptRoute(makeListCarsController()));

export { createCarRouter , listCarRouter };
