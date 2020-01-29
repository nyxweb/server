import { Router } from 'express';

// Main Routes
import { admin, users, characters, notFound } from '.';

const router = Router();

router.use('/admin', admin);
router.use('/users', users);
router.use('/characters', characters);
router.use(notFound);

export default router;
