import { check } from 'express-validator';

const loginCheck = [
  check('username')
    .exists()
    .isString()
    .isLength({ min: 3, max: 10 })
    .withMessage('Invalid Username'),
  check('password')
    .exists()
    .isString()
    .isLength({ min: 3, max: 10 })
    .withMessage('Invalid Password')
];

export default loginCheck;
