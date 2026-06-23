import { CategoryModel } from '../models/category.model.js';

export const CategoryController = {
  async list(_req, res, next) {
    try {
      const rows = await CategoryModel.findAll();
      res.json(rows);
    } catch (err) { next(err); }
  },

  async getOne(req, res, next) {
    try {
      const row = await CategoryModel.findById(req.params.id);
      if (!row) return res.status(404).json({ message: 'Category not found' });
      res.json(row);
    } catch (err) { next(err); }
  },

  async create(req, res, next) {
    try {
      const row = await CategoryModel.create({ name: req.body.name });
      res.status(201).json(row);
    } catch (err) {
      if (err.code === '23505') {
        return res.status(409).json({ message: 'Category name already exists' });
      }
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const row = await CategoryModel.update(req.params.id, { name: req.body.name });
      if (!row) return res.status(404).json({ message: 'Category not found' });
      res.json(row);
    } catch (err) {
      if (err.code === '23505') {
        return res.status(409).json({ message: 'Category name already exists' });
      }
      next(err);
    }
  },

  async remove(req, res, next) {
    try {
      const row = await CategoryModel.remove(req.params.id);
      if (!row) return res.status(404).json({ message: 'Category not found' });
      res.json({ id: row.id });
    } catch (err) { next(err); }
  },
};