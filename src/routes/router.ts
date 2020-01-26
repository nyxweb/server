import { Router } from 'express';

// Main Routes
import { users, characters, notFound } from '.';

const router = Router();

router.use('/users', users);
router.use('/characters', characters);
router.use(notFound);

export default router;
