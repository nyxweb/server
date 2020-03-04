import { Router } from 'express';

// Controllers
import addstats from '../../../controllers/user/character/addstats';

const router = Router();

/**
 * @PATH: /user/character/addstats
 */

router.get('/', addstats);

export default router;
