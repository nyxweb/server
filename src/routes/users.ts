import { Router, Request, Response } from 'express';

import action from '../actions/users/export';

const users = Router();

/**
 * @PATH: /users - GET
 * @DESC: Returns all users
 */

users.get('/', action.get);

/**
 * @PATH: /users - POST
 * @DESC: Creates a new user
 */

users.post('/', (req: Request, res: Response) => {
  res.send('/users :POST');
});

export default users;
