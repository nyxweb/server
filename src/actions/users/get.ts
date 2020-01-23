import { Request, Response } from 'express';

import MEMB_INFO from '../../db/models/MEMB_INFO';

export default async (req: Request, res: Response) => {
  try {
    const getAll = await MEMB_INFO.findAll({
      limit: 5,
      attributes: ['memb___id', 'mail_addr']
    });

    res.json(getAll);
  } catch (error) {
    console.log('error:', error.message);
    res.status(500).send('Server error');
  }
};
