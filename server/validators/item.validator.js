import { body } from 'express-validator';

export const itemRules = [
  body('name').trim().isLength({ min: 1, max: 200 }).withMessage('Name is required'),
  body('type').trim().isLength({ min: 1, max: 80 }).withMessage('Type is required'),
  body('description').optional({ checkFalsy: true }).isString(),
  body('image_url').optional({ checkFalsy: true }).isURL().withMessage('Image URL must be a valid URL'),
  body('address').optional({ checkFalsy: true }).isString(),
  body('rating')
    .optional({ checkFalsy: true })
    .isFloat({ min: 0, max: 5 })
    .withMessage('Rating must be between 0 and 5'),
  body('is_free').optional().isBoolean().withMessage('is_free must be boolean'),
  body('category_id').isInt({ min: 1 }).withMessage('Valid category_id is required'),
];