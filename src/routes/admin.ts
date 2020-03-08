import { Router } from 'express';

// Validation
import validator from '../middleware/validator';
// import auth from '../middleware/auth';
import check from '../checks/admin';

// Actions
import admin from '../actions/admin';

const router = Router();

/**
 * @PATH: /admin/auth - POST
 * @DESC: Admin Login
 */

router.post('/auth', check.login, validator, admin.auth);

export default router;
