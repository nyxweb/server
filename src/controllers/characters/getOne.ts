// import { getManager } from 'typeorm';

// // Types
// import { Request, Response } from 'express';

// // Tools
// import logger from '../../tools/logger';

// const getOne = async (req: Request, res: Response) => {
//   try {
//     const result = await getManager().find('Character', {
//       where: {
//         Name: req.params.name
//       },
//       select: ['Name', 'Resets']
//     });

//     res.json(result || { error: 'No result' });
//   } catch (error) {
//     logger.error({ error, res });
//   }
// };

// export default getOne;
