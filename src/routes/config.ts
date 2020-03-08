import { Router } from 'express';

// Validation
import validator from '../middleware/validator';
import check from '../checks/config';

// Controllers
import config from '../controllers/config';

const router = Router();

/**
 * @PATH: /config - GET
 * @DESC: Returns a list of configurations
 */

router.get('/', config.getConfig);

/**
 * @PATH: /config/events - POST
 * @DESC: Creates a new event
 */

// router.post('/events', check.create.events, validator, config.create.events);

export default router;
