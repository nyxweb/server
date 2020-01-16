import { Router, Request, Response } from 'express';

import { Character } from '../db/models/Character';

const characters = Router();

characters.get('/', async (req: Request, res: Response) => {
  try {
    const getOne = await Character.findOne({
      where: {
        Name: 'Dea7h',
      },
    });

    res.json(getOne);
  } catch (error) {
    console.log('error:', error.message);
    res.status(500).send('Server error');
  }
});

characters.post('/', (req: Request, res: Response) => {
  res.send('/characters :POST');
});

export default characters;
