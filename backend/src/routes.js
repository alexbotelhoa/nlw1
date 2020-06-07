import { Router } from 'express';
import { celebrate, Joi } from 'celebrate'
import multer from 'multer';
import multerConfig from './config/multer';

import DashboardController from './controllers/DashboardController';
import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

const routes = Router();
const dashboardController = new DashboardController;
const pointsController = new PointsController;
const itemsController = new ItemsController;
const upload = multer(multerConfig);

routes.get('/', (req, res) => {
    return res.send('Olá Marilene!');
});

routes.get('/dashboard', dashboardController.index);

routes.get('/points', pointsController.index);
routes.post(
    '/points', 
    upload.single('image'),
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.number().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            uf: Joi.string().required().max(2),
            city: Joi.string().required(),
            items: Joi.string().required(),            
        })
    }, {
        abortEarly: false
    }),
    pointsController.create
);
routes.get('/points/:id', pointsController.show);

routes.get('/items', itemsController.index);

export default routes;