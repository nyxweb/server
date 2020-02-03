// Types
import { Request, Response } from 'express';

// Tools
import logger from '../../tools/logger';

// Models
import { Character, MEMB_STAT, AccountCharacter } from '../../db/models';

const getTopPlayers = async (req: Request, res: Response) => {
  try {
    const findSM = await Character.findOne({
      where: { Class: 1 },
      attributes: ['Name', 'Class', 'HOFWins'],
      order: [
        ['HOFWins', 'DESC'],
        ['Resets', 'DESC'],
        ['cLevel', 'DESC']
      ],
      include: [
        {
          model: MEMB_STAT,
          attributes: ['ConnectStat']
        },
        {
          model: AccountCharacter,
          attributes: ['GameIDC']
        }
      ],
      raw: true
    });

    const findBK = await Character.findOne({
      where: { Class: 17 },
      attributes: ['Name', 'Class', 'HOFWins'],
      order: [
        ['HOFWins', 'DESC'],
        ['Resets', 'DESC'],
        ['cLevel', 'DESC']
      ],
      include: [
        {
          model: MEMB_STAT,
          attributes: ['ConnectStat']
        },
        {
          model: AccountCharacter,
          attributes: ['GameIDC']
        }
      ],
      raw: true
    });

    const findME = await Character.findOne({
      where: { Class: 33 },
      attributes: ['Name', 'Class', 'HOFWins'],
      order: [
        ['HOFWins', 'DESC'],
        ['Resets', 'DESC'],
        ['cLevel', 'DESC']
      ],
      include: [
        {
          model: MEMB_STAT,
          attributes: ['ConnectStat']
        },
        {
          model: AccountCharacter,
          attributes: ['GameIDC']
        }
      ],
      raw: true
    });

    const findMG = await Character.findOne({
      where: { Class: 48 },
      attributes: ['Name', 'Class', 'HOFWins'],
      order: [
        ['HOFWins', 'DESC'],
        ['Resets', 'DESC'],
        ['cLevel', 'DESC']
      ],
      include: [
        {
          model: MEMB_STAT,
          attributes: ['ConnectStat']
        },
        {
          model: AccountCharacter,
          attributes: ['GameIDC']
        }
      ],
      raw: true
    });

    const findDL = await Character.findOne({
      where: { Class: 64 },
      attributes: ['Name', 'Class', 'HOFWins'],
      order: [
        ['HOFWins', 'DESC'],
        ['Resets', 'DESC'],
        ['cLevel', 'DESC']
      ],
      include: [
        {
          model: MEMB_STAT,
          attributes: ['ConnectStat']
        },
        {
          model: AccountCharacter,
          attributes: ['GameIDC']
        }
      ],
      raw: true
    });

    const result = [
      { ...findSM },
      { ...findBK },
      { ...findME },
      { ...findMG },
      { ...findDL }
    ];

    res.json(result.length ? result : { error: 'No results' });
  } catch (error) {
    logger.error({ error, res });
  }
};

export default getTopPlayers;
