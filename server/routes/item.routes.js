import { Router } from 'express';
import { ItemController } from '../controllers/item.controller.js';
import { authRequired } from '../middleware/authRequired.js';
import { validate } from '../middleware/validate.js';
import { itemRules } from '../validators/item.validator.js';

const router = Router();

router.get   ('/',     ItemController.list);
router.get   ('/:id',  ItemController.getOne);
router.post  ('/',     authRequired, itemRules, validate, ItemController.create);
router.patch   ('/:id',  authRequired, itemRules, validate, ItemController.update);
router.delete('/:id',  authRequired, ItemController.remove);

export default router;