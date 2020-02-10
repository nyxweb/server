import { Router } from 'express';

// Main Routes
import { users, characters, guilds, config, notFound } from '.';

const router = Router();

router.use('/users', users);
router.use('/characters', characters);
router.use('/guilds', guilds);
router.use('/config', config);
router.use(notFound);

export default router;
