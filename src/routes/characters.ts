import { Router, Request, Response } from 'express';

import action from '../actions/characters/export';

const characters = Router();

/**
 * @PATH: /characters - GET
 * @DESC: Returns all characters
 */

characters.get('/', action.get);

/**
 * @PATH: /characters - POST
 * @DESC: Creates a new character
 */

characters.post('/', (req: Request, res: Response) => {
  res.send('/characters :POST');
});

export default characters;
