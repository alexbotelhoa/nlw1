import { Router } from 'express';
import knex from './database/connection';
import multer from 'multer';
import multerConfig from './config/multer';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

const routes = Router();
const pointsController = new PointsController;
const itemsController = new ItemsController;
const upload = multer(multerConfig);

routes.get('/', (req, res) => {
    return res.send('Olá Marilene!');
});

routes.get('/items', itemsController.index);

routes.get('/points', pointsController.index);
routes.post('/points', upload.single('image'), pointsController.create);
routes.get('/points/:id', pointsController.show);

export default routes;