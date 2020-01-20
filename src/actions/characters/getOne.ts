import { Request, Response } from 'express';
import errorHandler from '../../tools/errorHandler';

// Models
import Character from '../../db/models/Character';

export default async (req: Request, res: Response) => {
  try {
    const result = await Character.findOne({
      where: {
        Name: req.params.name,
      },
      attributes: ['Name', 'Resets'],
    });

    res.json(result || { error: 'No result' });
  } catch (error) {
    errorHandler({ res, error, __filename });
  }
};
