import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send('/characters :GET');
});

router.post('/', (req: Request, res: Response) => {
  res.send('/characters :POST');
});

export default router;
