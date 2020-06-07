import { Request, Response } from 'express';
import knex from '../database/connection';

class DashboardController {
    async index(req: Request, res: Response) {
        const points = await knex('points')
            .select('points.*')
            .select('point_items.item_id')
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            // .whereIn('point_items.item_id', parsedItems)
            // .where('city', String(city))
            // .where('uf', String(uf))
            .distinct()
        if (!points) return res.status(400).json({ error: 'Points não encontrado!'});

        // const items = await knex('items')
        // .select('items.title')
        // .join('point_items', 'items.id', '=', 'point_items.item_id')
        // // .where('point_items.point_id', id)
        // if (!items) return res.status(400).json({ error: 'Items não encontrado!'});

        const serializedPoints = points.map(point => {
            return {
                ...point,
                image_url: `http://192.168.1.101:3333/uploads/${point.image}`,
            };
        });

        // return res.json({ point: serializedPoints, items })
        return res.json(serializedPoints)
    }
}

export default DashboardController;