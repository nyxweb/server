import { Router } from 'express';

// Validation
import validator from '../../middleware/validator';
import check from '../../checks/users';

// Controllers
import user from '../../controllers/user';

const router = Router();

/**
 * @PATH: /user/auth - POST
 * @DESC: Authenticates a user
 */

router.post('/auth', check.account.auth, validator, user.account.auth);

/**
 * @PATH: /user/verify - POST
 * @DESC: Verifies a user
 */

router.post('/verify', user.account.verify);

/**
 * @PATH: /user - POST
 * @DESC: Creates a new user account
 */

router.post('/', check.account.create, validator, user.account.create);

export default router;
