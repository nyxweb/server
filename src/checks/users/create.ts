import { check } from 'express-validator';

const createCheck = [
  check('username')
    .exists()
    .withMessage('Username is required')
    .isLength({ min: 4, max: 10 })
    .withMessage('Username must be between 4-10 characters')
    .matches(/^[a-z0-9]+$/i)
    .withMessage('Username can only consist of letters and digits'),
  check('password')
    .exists()
    .withMessage('Password is required')
    .isLength({ min: 4, max: 10 })
    .withMessage('Password must be between 4-10 characters')
    .matches(/^[a-z0-9]+$/i)
    .withMessage('Password can only consist of letters and digits'),
  check('email', 'Valid E-Mail address is required')
    .exists()
    .isEmail()
];

export default createCheck;
