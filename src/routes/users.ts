import { Router } from 'express';

// Validation
import validator from '../checks/validator';
import check from '../checks/users';

// Actions
import action from '../actions/users';

const usersRouter = Router();

/**
 * @PATH: /users - GET
 * @DESC: Returns all users
 */

usersRouter.get('/', action.get);

/**
 * @PATH: /users - POST
 * @DESC: Creates a new user
 */

usersRouter.post('/', check.create, validator, action.create);

export default usersRouter;
