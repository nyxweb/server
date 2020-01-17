import { Router, Request, Response } from 'express';

import MEMB_INFO from '../db/models/MEMB_INFO';

const users = Router();

/**
 * @PATH: /users - GET
 * @DESC: Returns all users
 */

users.get('/', async (req: Request, res: Response) => {
  try {
    const getAll = await MEMB_INFO.findAll({
      limit: 5,
      attributes: ['memb___id', 'mail_addr', 'reg_ip'],
      raw: true,
    });

    res.json(getAll);
  } catch (error) {
    console.log('woops:', error.message);
  }
});

/**
 * @PATH: /users - POST
 * @DESC: Creates a new user
 */

users.post('/', (req: Request, res: Response) => {
  res.send('/users :POST');
});

export default users;
