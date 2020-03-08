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

router.get('/', check.get.many, validator, characters.get.many);

/**
 * @PATH: /characters/search/:name - GET
 * @DESC: Returns characters based on a string (:name)
 */

router.get('/search/:name', check.get.search, validator, characters.get.search);

/**
 * @PATH: /characters/hof - GET
 * @DESC: Returns a list of 5 characters
 */

router.get('/hof', characters.get.hof);

/**
 * @PATH: /characters/:name - GET
 * @DESC: Returns a single character
 */

router.get('/:name', check.get.one, validator, characters.get.one);

export default router;
