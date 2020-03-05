import { Router } from 'express';

// Validation
import validator from '../../middleware/validator';
import check from '../../checks/users';

// Controllers
import account from '../../controllers/user/account';

const router = Router();

/**
 * @path /user/account/auth - POST
 * @desc Authenticates a user
 */

router.post('/auth', check.account.auth, validator, account.auth);

/**
 * @path /user/account/verify - POST
 * @desc Verifies a user
 */

router.post('/verify', account.verify);

/**
 * @path /user/account - POST
 * @desc Creates a new user account
 */

router.post('/', check.account.create, validator, account.create);

/**
 * @path /user/account/logs - GET
 * @desc Returns a list of logs
 */

router.get('/logs', () => {
  console.log('object');
});

/**
 * @path /user/account/online - POST
 * @desc Exchanges online time for {resource}
 */

router.post('/online', () => {
  console.log('object');
});

/**
 * @path /user/account/password - PATCH
 * @desc Updates account password
 */

router.patch('/password', () => {
  console.log('object');
});

/**
 * @path /user/account/vip - PATCH
 * @desc Updates user VIP status
 */

router.patch('/vip', () => {
  console.log('object');
});

export default router;
