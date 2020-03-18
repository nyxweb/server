import { Router } from 'express';

// Validation
import validator from '../middleware/validator';
import check from '../validation/guilds';

// Controllers
import guilds from '../controllers/guilds';

const router = Router();

/**
 * @path /characters - GET
 * @desc Returns characters
 */

router.get('/', check.getMany, validator, guilds.getMany);

/**
 * @path /characters - GET
 * @desc Returns characters
 */

router.get('/:name', check.getOne, validator, guilds.getOne);

export default router;
