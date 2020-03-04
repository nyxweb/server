import { Router } from 'express';

// Controllers
import auction from '../../../controllers/user/extra/auction';

const router = Router();

/**
 * @PATH: /user/extra/auction
 */

router.get('/auction', auction.bid);

export default router;
