import { Router } from 'express';

// Routes
import market from './market';
import auction from './auction';
import storage from './storage';
import resources from './resources';
import quests from './quests';

const router = Router();

/**
 * @PATH: /user/extra/market
 */

router.use('/market', market);

/**
 * @PATH: /user/extra/auction
 */

router.use('/auction', auction);

/**
 * @PATH: /user/account/storage
 */

router.use('/storage', storage);

/**
 * @PATH: /user/account/resources
 */

router.use('/resources', resources);

/**
 * @PATH: /user/account/quests
 */

router.use('/quests', quests);

export default router;
