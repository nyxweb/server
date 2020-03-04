import { Router } from 'express';

// Controllers
import cClass from '../../../controllers/user/character/class';

const router = Router();

/**
 * @PATH: /user/character/class
 */

router.get('/', cClass);

export default router;
