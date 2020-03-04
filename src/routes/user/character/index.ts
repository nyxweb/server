import { Router } from 'express';

// Routes
import addstats from './addstats';
import cClass from './class';
import name from './name';
import reset from './reset';

const router = Router();

/**
 * @PATH: /user/character/addstats
 */

router.use('/addstats', addstats);

/**
 * @PATH: /user/character/class
 */

router.use('/class', cClass);

/**
 * @PATH: /user/character/name
 */

router.use('/name', name);

/**
 * @PATH: /user/character/reset
 */

router.use('/reset', reset);

export default router;
