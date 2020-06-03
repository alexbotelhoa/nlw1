import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {
    async index(req: Request, res: Response) {
        const { city, uf, items } = req.query;
        
        const parsedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()))

        const points = await knex('points')
            .select('points.*')
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
        if (!points) return res.status(400).json({ error: 'Points não encontrado!'});

        return res.json(points)
    }

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
            image: 'https://images.unsplash.com/photo-1501523460185-2aa5d2a0f981?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
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

        await trx.commit()

        return res.json({
            id: point_id,
            ...point,
        });
    }

    async show(req: Request, res: Response) {
        const { id } = req.params;

        const point = await knex('points').where('id', id).first();
        if (!point) return res.status(400).json({ error: 'Point não encontrado!'});

        const items = await knex('items')
            .select('items.title')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', id)
        if (!items) return res.status(400).json({ error: 'Items não encontrado!'});

        return res.json({ point, items })
    }
}

export default PointsController;
