import { Request, Response } from 'express';
import knex from '../database/connection';

class DashboardController {
    async index(req: Request, res: Response) {
        const { uf, city, items } = req.query;

        const parsedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()))

        const pointsArray = await knex
            .select(
                'points.id',
                'points.image',
                'points.name',
                'points.email',
                'points.whatsapp',
            )
            .from('points')
            .leftJoin('point_items', 'points.id', 'point_items.point_id')
            .where('uf', '=', String(uf))
            .where('city', '=', String(city))
            .whereIn('point_items.item_id', parsedItems)
            .distinct()
        if (!pointsArray) return res.status(400).json({ error: 'Points não encontrado!'});

        const itemsArray = await knex('items')
        .select(
            'point_items.point_id',
            'items.title',
        )
        .join('point_items', 'items.id', '=', 'point_items.item_id')
        .orderBy(['point_items.point_id','items.title'])
        if (!itemsArray) return res.status(400).json({ error: 'Items não encontrado!'});
        
        const serializedPoints = pointsArray.map(point => {
            return {
                ...point,
                image_url: `http://192.168.1.101:3333/uploads/${point.image}`,
                items: itemsArray.map(item => {
                    if (point.id === item.point_id) return `${item.title}, `;
                })
            };
        });

        return res.json(serializedPoints)
    }
}

export default DashboardController;