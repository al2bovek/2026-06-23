import { ItemModel } from '../models/item.model.js';

export const ItemController = {
  async list(req, res, next) {
    try {
      const rows = await ItemModel.findAll({
        q:          req.query.q,
        categoryId: req.query.category_id,
        type:       req.query.type,
        isFree:     req.query.is_free,
        ratingMin:  req.query.rating_min,
        ratingMax:  req.query.rating_max,
      });
      res.json(rows);
    } catch (err) { next(err); }
  },

  async getOne(req, res, next) {
    try {
      const row = await ItemModel.findById(req.params.id);
      if (!row) return res.status(404).json({ message: 'Item not found' });
      res.json(row);
    } catch (err) { next(err); }
  },

  async create(req, res, next) {
    try {
      const row = await ItemModel.create(req.body);
      res.status(201).json(row);
    } catch (err) {
      if (err.code === '23503') {
        return res.status(400).json({ message: 'Category does not exist' });
      }
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const row = await ItemModel.update(req.params.id, req.body);
      if (!row) return res.status(404).json({ message: 'Item not found' });
      res.json(row);
    } catch (err) {
      if (err.code === '23503') {
        return res.status(400).json({ message: 'Category does not exist' });
      }
      next(err);
    }
  },

  async remove(req, res, next) {
    try {
      const row = await ItemModel.remove(req.params.id);
      if (!row) return res.status(404).json({ message: 'Item not found' });
      res.json({ id: row.id });
    } catch (err) { next(err); }
  },
};