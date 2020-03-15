import { check } from 'express-validator';

const reset = [
  check('name', 'Please choose a character')
    .isString()
    .isLength({ min: 1, max: 10 })
];

const stats = [
  check('Name', 'Please choose a character')
    .isString()
    .isLength({ min: 1, max: 10 }),
  check('Strength', 'Invalid Strength value').matches(/^\d{0,5}$/),
  check('Dexterity', 'Invalid Agility value').matches(/^\d{0,5}$/),
  check('Vitality', 'Invalid Vitality value').matches(/^\d{0,5}$/),
  check('Energy', 'Invalid Energy value').matches(/^\d{0,5}$/),
  check('Leadership', 'Invalid Command value').matches(/^\d{0,5}$/)
];

export default {
  reset,
  stats
};
