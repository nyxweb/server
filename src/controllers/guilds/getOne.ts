// Types
import { Request, Response } from 'express';

// Tools
import logger from '../../tools/logger';

// Models
import model from '../../db/models';

const getOne = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;

    const guild = await model.Guild.findOne({
      where: {
        G_Name: name
      },
      include: [
        {
          model: model.GuildMember,
          include: [
            {
              model: model.Character,
              attributes: [
                'Name',
                'cLevel',
                'Resets',
                'Class',
                'MapNumber',
                'MapPosX',
                'MapPosY',
                'PKCount',
                'HOFWins'
              ],
              include: [
                {
                  model: model.MEMB_STAT,
                  attributes: ['ConnectStat'],
                  include: [
                    {
                      model: model.AccountCharacter,
                      attributes: ['GameIDC']
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          model: model.Guild
        }
      ]
    });

    if (!guild) {
      return res.status(400).json({ error: `This guild doesn't exist` });
    }

    res.json(guild);
  } catch (error) {
    logger.error({ error, res });
  }
};

export default getOne;
