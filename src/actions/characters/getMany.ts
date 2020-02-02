// Types
import { Request, Response } from 'express';

// Tools
import logger from '../../tools/logger';

// Models
import {
  Character,
  MEMB_STAT,
  GuildMember,
  Guild,
  AccountCharacter
} from '../../db/models';

const getMany = async (req: Request, res: Response) => {
  try {
    const result = await Character.findAll({
      limit: 5,
      attributes: [
        'Name',
        'Class',
        'cLevel',
        'Resets',
        'Money',
        'PkCount',
        'QuestNumber',
        'TotalTime'
      ],
      // order: [[{ model: MEMB_STAT, as: 'status' }, 'TotalTime', 'DESC']],
      order: [['Resets', 'DESC']],
      include: [
        {
          model: MEMB_STAT,
          attributes: ['ConnectStat', 'ConnectTM', 'DisConnectTM', 'TotalTime']
        },
        {
          model: AccountCharacter,
          attributes: [
            'GameID1',
            'GameID2',
            'GameID3',
            'GameID4',
            'GameID5',
            'GameIDC'
          ]
        },
        {
          model: GuildMember,
          attributes: ['G_Name'],
          include: [
            {
              model: Guild,
              attributes: ['G_Mark']
            }
          ]
        }
      ]
    });

    res.json(result.length ? result : { error: 'No results' });
  } catch (error) {
    logger.error({ error, res });
  }
};

export default getMany;
