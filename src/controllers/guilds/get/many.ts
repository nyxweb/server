import sequelize from '../../../db/connect';

// Types
import { Request, Response } from 'express';

// Tools
import logger from '../../../tools/logger';

// Models
// import model from '../../../db/models';

const getMany = async (req: Request, res: Response) => {
  try {
    const { limit = 5, offset = 1 } = req.query;

    const result = await sequelize.query(
      `SELECT TOP ${limit} G.G_Name, G.G_Mark,
        (SELECT SUM(Resets) FROM Character C
        LEFT JOIN GuildMember GM ON C.Name=GM.Name
        WHERE GM.G_Name=G.G_Name) AS TotalResets,
        (SELECT COUNT(*) FROM Character C
        LEFT JOIN GuildMember GM ON C.Name=GM.Name
        WHERE GM.G_Name=G.G_Name) AS TotalMembers
      FROM Guild G
      ORDER BY TotalResets DESC`,
      { type: sequelize.QueryTypes.SELECT }
    );

    // const result = await model.Guild.findAll({
    //   limit: Number(limit),
    //   offset: Number(offset) - 1,
    //   include: [
    //     {
    //       model: model.GuildMember,
    //       include: [
    //         {
    //           model: model.Character,
    //           attributes: ['Resets']
    //         }
    //       ]
    //     }
    //   ],
    //   order: [
    //     [
    //       { model: model.GuildMember, as: 'guild_memb' },
    //       { model: model.Character, as: 'character' },
    //       col('Resets'),
    //       'DESC'
    //     ]
    //   ]
    // });

    res.json(result);
  } catch (error) {
    logger.error({ error, res });
  }
};

export default getMany;
