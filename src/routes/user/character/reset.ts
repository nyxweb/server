import { Router } from 'express';

// Controllers
import reset from '../../../controllers/user/character/reset';

const router = Router();

/**
 * @PATH: /user/character/reset
 */

router.get('/', reset);

export default router;
