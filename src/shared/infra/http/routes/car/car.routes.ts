import { Router } from 'express';
import { adaptRoute } from '../../config/adapter';
import { authenticate } from '../../middlewares/authenticate';
import { makeCreateCarController } from '../../../factories/create-car';
import { makeListCarsController } from '../../../factories/list-cars';
import { makeDetailsCarsController } from '../../../factories/details-car';
import { makeDeleteCarController } from '../../../factories/delete-car';


const createCarRouter = Router();
const listCarRouter = Router();
const detailsRouter = Router();
const deleteCarRouter = Router();

createCarRouter.post('/', authenticate, adaptRoute(makeCreateCarController()));
listCarRouter.get('/', authenticate, adaptRoute(makeListCarsController()));
detailsRouter.get('/:id', authenticate, adaptRoute(makeDetailsCarsController()));
deleteCarRouter.delete('/:id', authenticate, adaptRoute(makeDeleteCarController()));


export { createCarRouter, listCarRouter, detailsRouter, deleteCarRouter };
