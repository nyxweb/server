import sequelize from '../../../db/connect';

// Types
import { Request, Response } from 'express';

// Tools
import logger from '../../../tools/logger';

const getMany = async (req: Request, res: Response) => {
  try {
    const { perPage = 5, page = 1 } = req.query;

    const result = await sequelize.query(
      `SELECT G_Name, G_Mark,
        (SELECT SUM(Resets) FROM Character
        LEFT JOIN GuildMember ON Character.Name = GuildMember.Name
        WHERE GuildMember.G_Name = Guild.G_Name) AS TotalResets,
        (SELECT COUNT(*) FROM Character
        LEFT JOIN GuildMember ON Character.Name = GuildMember.Name
        WHERE GuildMember.G_Name = Guild.G_Name) AS TotalMembers
      FROM Guild
      ORDER BY TotalResets DESC
      OFFSET ${(page - 1) * perPage} ROWS
      FETCH NEXT ${perPage} ROWS ONLY`,
      { type: sequelize.QueryTypes.SELECT }
    );

    res.json(result);
  } catch (error) {
    logger.error({ error, res });
  }
};

export default getMany;
