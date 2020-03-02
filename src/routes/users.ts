import { Router } from 'express';

// Validation
import validator from '../middleware/validator';
import check from '../checks/users';

// Controllers
import users from '../controllers/users';

const router = Router();

/**
 * @PATH: /users/auth - POST
 * @DESC: Authenticates a user
 */

router.post('/auth', check.account.auth, validator, users.account.auth);

/**
 * @PATH: /users/verify - POST
 * @DESC: Verifies a user
 */

router.post('/verify', users.account.verify);

/**
 * @PATH: /users - POST
 * @DESC: Creates a new user account
 */

router.post('/', check.account.create, validator, users.account.create);

export default router;
