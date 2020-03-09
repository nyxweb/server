import { check } from 'express-validator';

const vipCheck = [
  check('vipDays', 'vipDays must be specified')
    .isInt({ allow_leading_zeroes: false, gt: 0, lt: 31 })
    .matches(/^[0-9]+$/)
];

export default vipCheck;
