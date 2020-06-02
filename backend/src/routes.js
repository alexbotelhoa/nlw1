import { Router } from 'express';

const routes = Router();

routes.get('/', (req, res) => {
    return res.send('Olá Marilene!');
});

routes.get('/items', async (req, res) => {
    const items = await knex('items').select('*');
    
    const serializedItems = items.map(item => {
        return 
    })

    return res.json(items);
});

export default routes;