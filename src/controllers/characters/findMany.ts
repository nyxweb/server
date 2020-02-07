// import { getManager, Like } from 'typeorm';

// // Types
// import { Request, Response } from 'express';

// // Tools
// import logger from '../../tools/logger';

// const findMany = async (req: Request, res: Response) => {
//   try {
//     const result = await getManager().find('Character', {
//       take: 50,
//       where: {
//         Name: Like(`%${req.params.name}%`)
//       },
//       select: ['Name', 'Resets'],
//       relations: ['MEMB_STAT']
//     });

//     res.json(result.length ? result : { error: 'No results' });
//   } catch (error) {
//     logger.error({ error, res });
//   }
// };

// export default findMany;
