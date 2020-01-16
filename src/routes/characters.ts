import { Router, Request, Response } from 'express';

import { Character } from '../db/models/Character';

const characters = Router();

characters.get('/', async (req: Request, res: Response) => {
  try {
    const getAll = await Character.findAll({
      limit: 50,
      attributes: ['Name', 'Resets'],
    });

    res.json(getAll);
  } catch (error) {
    console.log('error:', error.message);
    res.status(500).send('Server error');
  }
});

characters.post('/', (req: Request, res: Response) => {
  res.send('/characters :POST');
});

export default characters;
