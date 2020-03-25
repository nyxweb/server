import { check } from 'express-validator';

const auth = [
  check('username', 'Username is required')
    .isString()
    .isLength({ min: 4, max: 10 })
    .matches(/^[a-z0-9]+$/i),
  check('password', 'Password is required')
    .isString()
    .isLength({ min: 4, max: 10 })
    .matches(/^[a-z0-9]+$/i)
];

const create = [
  check('username')
    .isString()
    .withMessage('Username is required')
    .isLength({ min: 4, max: 10 })
    .withMessage('Username must be between 4-10 characters')
    .matches(/^[a-z0-9]+$/i)
    .withMessage('Username can only consist of letters and digits'),
  check('password')
    .isString()
    .withMessage('Password is required')
    .isLength({ min: 4, max: 10 })
    .withMessage('Password must be between 4-10 characters')
    .matches(/^[a-z0-9]+$/i)
    .withMessage('Password can only consist of letters and digits'),
  check('email', 'Valid E-Mail address is required')
    .isString()
    .isEmail()
];

const password = [
  check('password', 'Current Password is required').matches(
    /^[a-z0-9]{4,10}$/i
  ),
  check('newPassword', 'Password is required').matches(/^[a-z0-9]{4,10}$/i),
  check('newRePassword', 'Re-Password is required').custom(
    (value, { req: { body } }) => {
      if (value !== body.newPassword) {
        throw new Error('Your new Passwords do not match.');
      } else if (value === body.password) {
        throw new Error(
          'Your new password cannot be the same as your old one.'
        );
      }
      return true;
    }
  )
];

const vip = [
  check('vipDays', 'vipDays must be specified')
    .isInt({ allow_leading_zeroes: false, gt: 0, lt: 31 })
    .matches(/^[0-9]+$/)
];

export default { auth, create, password, vip };
