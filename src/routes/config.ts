import { Router } from 'express';

// Validation
import validator from '../middleware/validator';
import check from '../checks/config';

// Controllers
import config from '../controllers/config';

const router = Router();

/**
 * @PATH: /config/events - GET
 * @DESC: Returns an events list
 */

router.get('/events', config.get.events);

/**
 * @PATH: /config/events - POST
 * @DESC: Create a new event
 */

router.post('/events', check.create.events, validator, config.create.events);

export default router;
