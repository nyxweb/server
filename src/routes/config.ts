import { Router, Request, Response } from 'express';

// Configuration
import events from '../configs/events.json';

const router = Router();

/**
 * @PATH: /config/events - GET
 * @DESC: Returns an events list
 */

router.get('/events', (req: Request, res: Response) => {
  res.json(events);
});

export default router;
