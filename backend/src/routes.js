import { Router } from 'express';
import knex from './database/connection'

import PointsController from './controllers/PointsController'

const routes = Router();
const pointsController = new PointsController;

routes.get('/', (req, res) => {
    return res.send('Olá Marilene!');
});

routes.get('/items', async (req, res) => {
    const items = await knex('items').select('*');
    
    const serializedItems = items.map(item => {
        return {
            id: item.id,
            title: item.title,
            image_url: `http://192.168.1.101:3333/uploads/${item.image}`,
        };
    });

    return res.json(serializedItems);
});

routes.post('/points', pointsController.create);

export default routes;