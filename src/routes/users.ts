import express, { Request, Response } from 'express';

import charModel from '../db/models/Character';

const router = express.Router();

/**
 * @PATH: /users - GET
 * @DESC: Returns all users
 */

router.get('/', async (req: Request, res: Response) => {
  const Character = charModel();

  const character = await Character.findOne({
    where: { Name: 'Dea7h' },
    attributes: ['AccountID', 'Name'],
    raw: true,
  });

  res.json(character);
});

/**
 * @PATH: /users - POST
 * @DESC: Creates a new user
 */

router.post('/', (req: Request, res: Response) => {
  res.send('/users :POST');
});

export default router;
