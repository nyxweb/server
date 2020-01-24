import { Router } from 'express';

// Main Routes
import { users, characters } from '.';

const router = Router();

router.use('/users', users);
router.use('/characters', characters);

export default router;
