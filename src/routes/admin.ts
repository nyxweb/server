import { Router } from 'express';

// Validation
import validator from '../middleware/validator';
import check from '../checks/users';

// Actions
import admin from '../actions/admin';

const router = Router();

/**
 * @PATH: /admin/auth - POST
 * @DESC: Authenticates an admin
 */

router.post('/auth', check.auth, validator, admin.auth);

export default router;
