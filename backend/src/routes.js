import { Router } from 'express';
import knex from './database/connection'

import PointsController from './controllers/PointsController'
import ItemsController from './controllers/ItemsController'

const routes = Router();
const pointsController = new PointsController;
const itemsController = new ItemsController;

routes.get('/', (req, res) => {
    return res.send('Olá Marilene!');
});

routes.get('/items', itemsController.index);

routes.get('/points', pointsController.index);
routes.post('/points', pointsController.create);
routes.get('/points/:id', pointsController.show);

export default routes;