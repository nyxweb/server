import { Router } from 'express';

// Validation
import validator from '../../middleware/validator';
import auth from '../../middleware/auth';
import check from '../../validation/users/account';

// Controllers
import account from '../../controllers/user/account';

const router = Router();

/**
 * @path /user/account/auth - POST
 * @desc Authenticates a user
 */

router.post('/auth', check.auth, validator, account.auth);

/**
 * @path /user/account/verify - POST
 * @desc Verifies a user
 */

router.post('/verify', account.verify);

/**
 * @path /user/account - POST
 * @desc Creates a new user account
 */

router.post('/', check.create, validator, account.create);

/**
 * @path /user/account/logs - GET
 * @desc Returns a list of logs
 */

router.get('/logs', auth, account.getLogs);

/**
 * @path /user/account/online - GET
 * @desc Returns online time info
 */

router.get('/online', auth, account.getOnline);

/**
 * @path /user/account/online - PATCH
 * @desc Exchanges online time for {resource}
 */

router.patch('/online', auth, account.exchangeOnline);

/**
 * @path /user/account/password - PATCH
 * @desc Updates account password
 */

router.patch('/password', auth, check.password, validator, account.password);

/**
 * @path /user/account/vip - GET
 * @desc Returns MEMB_INFO data
 */

router.get('/vip', auth, account.getVip);

/**
 * @path /user/account/vip - PATCH
 * @desc Updates user VIP status
 */

router.patch('/vip', auth, check.vip, validator, account.buyVip);

export default router;
