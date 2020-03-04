import { Router } from 'express';

// Controllers
import name from '../../../controllers/user/character/name';

const router = Router();

/**
 * @PATH: /user/character/name
 */

router.get('/', name);

export default router;
