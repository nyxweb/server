import { Request, Response } from 'express';
import { Op } from 'sequelize';
import errorHandler from '../../tools/errorHandler';

// Models
import Character from '../../db/models/Character';

export default async (req: Request, res: Response) => {
  try {
    const getAll = await Character.findAll({
      limit: 50,
      where: {
        Name: { [Op.like]: `%${req.params.name}%` },
      },
      attributes: ['Name', 'Resets'],
    });

    res.json(getAll);
  } catch (error) {
    errorHandler({ res, error, __filename });
  }
};
