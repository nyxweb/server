// import { getManager } from 'typeorm';

// // Types
// import { Request, Response } from 'express';

// // Tools
// import logger from '../../tools/logger';

// const getTopPlayers = async (req: Request, res: Response) => {
//   try {
//     const result = await getManager().find('Character', {
//       where: { Class: 1 },
//       select: ['Name', 'Class', 'HOFWins'],
//       order: {
//         HOFWins: 'DESC',
//         Resets: 'DESC',
//         cLevel: 'DESC'
//       },
//       relations: ['MEMB_STAT']
//     });

//     res.json(result.length ? result : { error: 'No results' });
//   } catch (error) {
//     logger.error({ error, res });
//   }
// };

// export default getTopPlayers;
