import { Router } from 'express';

// Routes
import online from '../../../controllers/user/account/online';

const router = Router();

/**
 * @PATH: /user/user/online
 */

router.get('/', online);

export default router;
