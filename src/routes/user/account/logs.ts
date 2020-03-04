import { Router } from 'express';

// Routes
import logs from '../../../controllers/user/account/logs';

const router = Router();

/**
 * @PATH: /user/user/logs
 */

router.get('/', logs);

export default router;
