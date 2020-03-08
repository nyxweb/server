import { Router } from 'express';

// Routes
import account from './account';
import character from './character';
import extra from './extra';

const router = Router();

/**
 * @PATH: /user/account
 */

router.use('/account', account);

/**
 * @PATH: /user/character
 */

router.use('/character', character);

/**
 * @PATH: /user/extra
 */

router.use('/extra', extra);

export default router;
