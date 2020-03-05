import { check } from 'express-validator';

const moveItem = [
  check('itemSlot', 'itemSlot is required')
    .matches(/^[0-9]$/)
    .isLength({ min: 0, max: 2 }),
  check('newSlot', 'newSlot is required')
    .matches(/^[0-9]$/)
    .isLength({ min: 0, max: 2 }),
  check('from', 'from is required')
    .matches(/^[0-9]$/)
    .isLength({ min: 0, max: 2 }),
  check('to', 'to is required')
    .matches(/^[0-9]$/)
    .isLength({ min: 0, max: 2 })
];

export default { moveItem };
