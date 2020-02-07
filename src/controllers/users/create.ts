// import { getManager } from 'typeorm';

// // Types
// import { Request, Response } from 'express';

// // Tools
// import logger from '../../tools/logger';

// // Models
// import MEMB_INFO from '../../db/entity/MEMB_INFO';

// const create = async (req: Request, res: Response) => {
//   try {
//     const { username, password, email } = req.body;

//     const findUsername = await getManager().findOne(MEMB_INFO, {
//       where: { memb___id: username }
//     });

//     const findEmail = await getManager().findOne(MEMB_INFO, {
//       where: { mail_addr: email }
//     });

//     if (findUsername) {
//       return res.json({ error: 'This Username has already been taken' });
//     }

//     if (findEmail) {
//       return res.json({ error: 'This E-Mail address is already in use' });
//     }

//     const newUser = new MEMB_INFO();

//     newUser.memb___id = username;
//     newUser.memb__pwd = password;
//     newUser.mail_addr = email;
//     newUser.memb_name = Date.now().toString();
//     newUser.reg_ip = req.ip;

//     await getManager().save(newUser);

//     res.json({ success: 'Registration successful' });
//   } catch (error) {
//     logger.error({ error, res });
//   }
// };

// export default create;
