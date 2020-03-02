import { check } from 'express-validator';

const authCheck = [
  check('username', 'Username is required')
    .isString()
    .isLength({ min: 4, max: 10 })
    .matches(/^[a-z0-9]+$/i),
  check('password', 'Password is required')
    .isString()
    .isLength({ min: 4, max: 10 })
    .matches(/^[a-z0-9]+$/i)
];

export default authCheck;
