import { check } from 'express-validator';

const passwordCheck = [
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

export default passwordCheck;
