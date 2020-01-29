import { Router } from 'express';

// Validation
import validator from '../middleware/validator';
import auth from '../middleware/auth';
import check from '../checks/characters';

// Actions
import characters from '../actions/characters';

const router = Router();

/**
 * @PATH: /characters - GET
 * @DESC: Returns characters
 */

router.get('/', characters.getMany);
router.get('/:name', check.name, validator, characters.getOne);
router.get('/find/:name', check.name, validator, characters.findMany);

/**
 * @PATH: /characters - POST
 * @DESC: Creates a new character
 */

router.post('/', auth, (req, res) => {
  res.send('/characters :POST');
});

export default router;
