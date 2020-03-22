import { Router } from 'express';

// Main Routes
import { user, characters, guilds, config, others, admin, notFound } from '.';

const router = Router();

router.use('/user', user);
router.use('/characters', characters);
router.use('/guilds', guilds);
router.use('/config', config);
router.use('/others', others);
router.use('/admin', admin);
router.use(notFound);

export default router;
