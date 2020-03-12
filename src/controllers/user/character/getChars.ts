// Types
import { Request, Response } from 'express';

// Tools
import logger from '../../../tools/logger';

// Models
import model from '../../../db/models';

const getChars = async (req: Request, res: Response) => {
  try {
    const characters = await model.Character.findAll({
      where: {
        AccountID: req.username
      },
      order: [
        ['cLevel', 'DESC'],
        ['Resets', 'DESC'],
        ['Money', 'DESC']
      ],
      attributes: [
        'Name',
        'Resets',
        'cLevel',
        'Money',
        'PkCount',
        'Strength',
        'Dexterity',
        'Vitality',
        'Energy',
        'Leadership',
        'LevelUpPoint',
        'Class'
      ]
    });

    const status = await model.MEMB_STAT.findOne({
      where: {
        memb___id: req.username
      },
      attributes: ['ConnectStat']
    });

    const account = await model.AccountCharacter.findOne({
      where: {
        Id: req.username
      },
      attributes: ['GameIDC']
    });

    const chars: any[] = [];
    characters.forEach(Char => {
      const char: any = Char.toJSON();
      char.status = status.ConnectStat === 1 && account.GameIDC === Char.Name;
      chars.push(char);
    });

    res.json(chars);
  } catch (error) {
    logger.error({ error, res });
  }
};

export default getChars;
