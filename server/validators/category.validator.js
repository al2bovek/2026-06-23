import { body } from 'express-validator';

export const categoryRules = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 120 })
    .withMessage('Name is required (max 120 chars)'),
];