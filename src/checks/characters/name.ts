import { param } from 'express-validator';

const nameCheck = [
  param('name')
    .isString()
    .withMessage('Invalid Character name')
    .isLength({ min: 1, max: 10 })
    .withMessage('Character name can only be between 1-10 characters')
];

export default nameCheck;
