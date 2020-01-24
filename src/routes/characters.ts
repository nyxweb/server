import { Router } from 'express';

// Authorization
import auth from '../tools/auth';

// Validation
import validator from '../checks/validator';
import check from '../checks/characters';

// Actions
import action from '../actions/characters';

const characters = Router();

/**
 * @PATH: /characters - GET
 * @DESC: Returns characters
 */

characters.get('/', auth, action.getMany);
characters.get('/:name', check.name, validator, action.getOne);
characters.get('/find/:name', check.name, validator, action.findMany);

/**
 * @PATH: /characters - POST
 * @DESC: Creates a new character
 */

characters.post('/', (req, res) => {
  res.send('/characters :POST');
});

export default characters;
