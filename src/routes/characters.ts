import { Router } from 'express';

// Validation
import validator from '../middleware/validator';
import check from '../validation/characters';

// Controllers
import characters from '../controllers/characters';

const router = Router();

/**
 * @path /characters - GET
 * @desc Returns characters
 */

router.get('/', check.getChars, validator, characters.getChars);

/**
 * @path /characters/search/:name - GET
 * @desc Returns characters based on a string (:name)
 */

router.get('/search/:name', check.search, validator, characters.search);

/**
 * @path /characters/hof - GET
 * @desc Returns a list of 5 characters
 */

router.get('/hof', characters.getHOF);

/**
 * @path /characters/:name - GET
 * @desc Returns a single character
 */

router.get('/:name', check.getOne, validator, characters.getOne);

export default router;
