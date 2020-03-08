import { Router } from 'express';

import { user, characters, guilds, config, others, notFound } from '.';

const router = Router();

router.use('/user', user);
router.use('/characters', characters);
router.use('/guilds', guilds);
router.use('/config', config);
router.use('/others', others);
router.use(notFound);

export default router;
