import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller.js';
import { authRequired } from '../middleware/authRequired.js';
import { validate } from '../middleware/validate.js';
import { categoryRules } from '../validators/category.validator.js';

const router = Router();

router.get   ('/',     CategoryController.list);
router.get   ('/:id',  CategoryController.getOne);
router.post  ('/',     authRequired, categoryRules, validate, CategoryController.create);
router.patch   ('/:id',  authRequired, categoryRules, validate, CategoryController.update);
router.delete('/:id',  authRequired, CategoryController.remove);

export default router;