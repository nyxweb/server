import { Router } from 'express';

// Controllers
import market from '../../../controllers/user/extra/market';

const router = Router();

/**
 * @PATH: /user/extra/market
 */

router.get('/', market);

export default router;
