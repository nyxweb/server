import { Router } from 'express';

// Routes
import vip from '../../../controllers/user/account/vip';

const router = Router();

/**
 * @PATH: /user/user/vip
 */

router.get('/', vip);

export default router;
