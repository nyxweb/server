import { check } from 'express-validator';

const moveItem = [
  check('itemSlot', 'itemSlot is required')
    .isInt({ allow_leading_zeroes: false, gt: -1, lt: 240 })
    .matches(/^[0-9]+$/),
  check('newSlot', 'newSlot is required')
    .isInt({ allow_leading_zeroes: false, gt: -1, lt: 240 })
    .matches(/^[0-9]+$/),
  check('from', 'from is required')
    .matches(/^[a-z]{7,9}$/)
    .isIn(['warehouse', 'storage']),
  check('to', 'to is required')
    .matches(/^[a-z]{7,9}$/)
    .isIn(['warehouse', 'storage'])
];

const withdraw = [
  check('withdraws', 'Parameter "withdraws" is required.').isArray({
    min: 1,
    max: 50
  })
];

const deposit = [
  check('deposits', 'Parameter "deposits" is required.')
    .optional()
    .isArray({
      min: 1,
      max: 50
    })
];

export default { moveItem, withdraw, deposit };
