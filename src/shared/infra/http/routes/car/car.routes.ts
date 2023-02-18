import { Router } from 'express';
import { adaptRoute } from '../../config/adapter';
import { authenticate } from '../../middlewares/authenticate';
import { makeCreateCarController } from '../../../factories/create-car';
import { makeListCarsController } from '../../../factories/list-cars';
import { makeDetailsCarsController } from '../../../factories/details-car';


const createCarRouter = Router();
const listCarRouter = Router();
const detailsRouter = Router();

createCarRouter.post('/', authenticate, adaptRoute(makeCreateCarController()));
listCarRouter.get('/', authenticate, adaptRoute(makeListCarsController()));
detailsRouter.get('/:id', authenticate, adaptRoute(makeDetailsCarsController()));

export { createCarRouter, listCarRouter, detailsRouter };
