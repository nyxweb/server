import { check } from 'express-validator';

const createCheck = [
  check('name')
    .isString()
    .withMessage('Name is requred')
    .isLength({ min: 2, max: 15 })
    .withMessage('Name should be between 2 and 15 characters')
    .matches(/^[a-z0-9_]+$/i)
    .withMessage('Name can only contain letters, numbers and underscore'),
  check('value')
    .isString()
    .withMessage('Value is required')
    .isLength({ min: 3, max: 500 })
    .matches(/^[a-z0-9":,}{\]\[\s]+$/i)
    .withMessage('Value is invalid')
];

export default createCheck;
