import { Router } from 'express';

// Main Routes
import users from './users';
import characters from './characters';

const router = Router();

router.use('/users', users);
router.use('/characters', characters);

export default router;
