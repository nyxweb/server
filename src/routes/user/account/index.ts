import { Router } from 'express';

// Validation
import validator from '../../middleware/validator';
import check from '../../checks/users';

// Controllers
import account from '../../controllers/user/account';

const router = Router();

router.get('/', (req, res) => res.end('account'));

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
