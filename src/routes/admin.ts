import { Router } from 'express';

// Validation
// import validator from '../middleware/validator';
// import check from '../validation/guilds';
import auth from '../middleware/auth';

// Controllers
import admin from '../controllers/admin';

const router = Router();

/**
 * @path /admin/config - PATCH
 * @desc Updates config
 */

router.patch('/config', auth, admin.updateConfig);

/**
 * @path /admin/news - POST
 * @desc Creates news
 */

router.post('/news', auth, admin.postNews);

export default router;
