import { Router } from 'express';

// Controllers
import config from '../controllers/config';

const router = Router();

/**
 * @path /config - GET
 * @desc Returns a list of configurations
 */

router.get('/', config.getConfig);

/**
 * @path /config/events - POST
 * @desc Creates a new event
 */

// router.post('/events', check.create.events, validator, config.create.events);

export default router;
