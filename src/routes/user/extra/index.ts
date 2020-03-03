import { Router } from 'express';

// Controllers
import user from '../../../controllers/user';

const router = Router();

/**
 * @PATH: /user/extra/market
 */

router.use('/market', user.extra.market);

/**
 * @PATH: /user/extra/auction
 */

router.use('/auction', user.extra.auction);

/**
 * @PATH: /user/account/storage
 */

router.use('/storage', user.extra.storage);

/**
 * @PATH: /user/account/resources
 */

router.use('/resources', user.extra.resources);

/**
 * @PATH: /user/account/quests
 */

router.use('/quests', user.extra.quests);

export default router;
