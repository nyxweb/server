import { query } from 'express-validator';

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

export default getMany;
