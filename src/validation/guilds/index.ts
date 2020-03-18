import { query, param } from 'express-validator';

const getMany = [
  query('limit')
    .optional()
    .isInt({ lt: 51, gt: 0 })
    .withMessage('Max 50 characters per page allowed'),

  query('offset')
    .optional()
    .isInt({ lt: 51, gt: 0 })
    .withMessage('Only page 1 to 50 are available')
];

const getOne = [
  param('name', 'Invalid guild name')
    .isString()
    .isLength({ min: 1, max: 10 })
];

export default { getMany, getOne };
