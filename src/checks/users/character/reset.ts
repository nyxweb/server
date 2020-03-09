import { check } from 'express-validator';

const createAccount = [
  check('name', 'Please choose a character')
    .isString()
    .isLength({ min: 1, max: 10 })
];

export default createAccount;
