import { Router } from 'express';

// Validation
import validator from '../../../middleware/validator';
import check from '../../../checks/users';

// Controllers
import account from '../../../controllers/user/account';

// Routes
import logs from './logs';
import online from './online';
import password from './password';
import vip from './vip';

const router = Router();

/**
 * @PATH /user/account/logs
 */

router.use('/logs', logs);

/**
 * @PATH /user/account/online
 */

router.use('/online', online);

/**
 * @PATH /user/account/password
 */

router.use('/password', password);

/**
 * @PATH /user/account/vip
 */

router.use('/vip', vip);

/**
 * @PATH: /user/auth - POST
 * @DESC: Authenticates a user
 */

router.post('/auth', check.account.auth, validator, account.auth);

/**
 * @PATH: /user/verify - POST
 * @DESC: Verifies a user
 */

router.post('/verify', account.verify);

/**
 * @PATH: /user - POST
 * @DESC: Creates a new user account
 */

router.post('/', check.account.create, validator, account.create);

export default router;
