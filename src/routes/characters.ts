import { Router } from 'express';

// Validation
import validator from '../middleware/validator';
import check from '../checks/characters';

// Controllers
import characters from '../controllers/characters';

const router = Router();

/**
 * @PATH: /characters - GET
 * @DESC: Returns characters
 */

router.get('/', check.getMany, validator, characters.getMany);

/**
 * @PATH: /characters/:name - GET
 * @DESC: Returns a single character
 */

router.get('/:name', check.getOne, validator, characters.getOne);

/**
 * @PATH: /characters/find/:name - GET
 * @DESC: Returns characters based on a string (:name)
 */

router.get('/find/:name', check.findMany, validator, characters.findMany);

// router.get('/hof', characters.getTopPlayers);

/**
 * @PATH: /characters - POST
 * @DESC: Creates a new character
 */

// router.post('/', auth, (req, res) => {
//   res.send('/characters :POST');
// });

export default router;
