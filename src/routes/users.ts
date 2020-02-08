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

router.post('/auth', check.get.auth, validator, users.get.auth);

/**
 * @PATH: /users/verify - POST
 * @DESC: Verifies a user
 */

router.post('/verify', users.get.verify);

/**
 * @PATH: /users - POST
 * @DESC: Creates a new user account
 */

router.post('/', check.create.account, validator, users.create.account);

export default router;
