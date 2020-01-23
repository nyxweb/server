import { Router, Request, Response } from 'express';

import action from '../actions/characters';

const characters = Router();

/**
 * @PATH: /characters - GET
 * @DESC: Returns characters
 */

characters.get('/', action.getMany);
characters.get('/:name', action.getOne);
characters.get('/find/:name', action.findMany);

/**
 * @PATH: /characters - POST
 * @DESC: Creates a new character
 */

characters.post('/', (req: Request, res: Response) => {
  res.send('/characters :POST');
});

export default characters;
