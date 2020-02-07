// import { Router } from 'express';

// // Validation
// import validator from '../middleware/validator';
// import check from '../checks/users';

// // Controllers
// import users from '../controllers/users';

// const router = Router();

// /**
//  * @PATH: /users - GET
//  * @DESC: Returns all users
//  */

// router.get('/', users.get);

// /**
//  * @PATH: /users/auth - POST
//  * @DESC: Authenticates a user
//  */

// router.post('/auth', check.auth, validator, users.auth);

// /**
//  * @PATH: /users/verify - POST
//  * @DESC: Verifies a user
//  */

// router.post('/verify', users.verify);

// /**
//  * @PATH: /users - POST
//  * @DESC: Creates a new user account
//  */

// router.post('/', check.create, validator, users.create);

// export default router;
