import { Router } from 'express';

// Validation
import validator from '../middleware/validator';
import check from '../checks/guilds';

// Controllers
import guilds from '../controllers/guilds';

const router = Router();

/**
 * @PATH: /characters - GET
 * @DESC: Returns characters
 */

router.get('/', check.get.many, validator, guilds.get.many);

export default router;
