import { Router } from 'express';

const routes = Router();

routes.get('/', (req, res) => {
    return res.send('Olá Marilene!');
});

export default routes;