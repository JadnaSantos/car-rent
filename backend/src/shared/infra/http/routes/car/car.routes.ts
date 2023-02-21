import { Router } from 'express';
import { adaptRoute } from '../../config/adapter';
import { authenticate } from '../../middlewares/authenticate';
import { makeCreateCarController } from '../../../factories/create-car';
import { makeListCarsController } from '../../../factories/list-cars';
import { makeDetailsCarsController } from '../../../factories/details-car';
import { makeDeleteCarController } from '../../../factories/delete-car';
import { makeUpdateCarController } from '../../../factories/update-car';
import { makeFinishCarController } from '../../../factories/finish-car';

const createCarRouter = Router();
const listCarRouter = Router();
const detailsRouter = Router();
const deleteCarRouter = Router();
const updateCarRouter = Router();
const finishCarRouter = Router();

createCarRouter.post('/', authenticate, adaptRoute(makeCreateCarController()));
listCarRouter.get('/', authenticate, adaptRoute(makeListCarsController()));
detailsRouter.get('/:id', authenticate, adaptRoute(makeDetailsCarsController()));
deleteCarRouter.delete('/:id', authenticate, adaptRoute(makeDeleteCarController()));
updateCarRouter.put('/', authenticate, adaptRoute(makeUpdateCarController()));
finishCarRouter.put('/', authenticate, adaptRoute(makeFinishCarController()));


export {
  createCarRouter,
  listCarRouter,
  detailsRouter,
  deleteCarRouter,
  updateCarRouter,
  finishCarRouter
};
