import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {
    async create(req: Request, res: Response) {
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = req.body

        const trx = await knex.transaction();

        const point = {
            image: 'foo',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        };

        const point_id = await trx('points').insert(point)

        const pointItems = items.map((item_id: number) => {
            return {
                item_id,
                point_id: point_id[0],
            }   
        })

        await trx('point_items').insert(pointItems)

        return res.json({
            id: point_id,
            ...point,
        });
    }
}

export default PointsController;