import { Router } from 'express';

// Validation
import validator from '../../middleware/validator';
import auth from '../../middleware/auth';
import check from '../../checks/users';

// Controllers
import character from '../../controllers/user/character';

const router = Router();

/**
 * @path /user/character - GET
 * @desc Returns list of characters
 */

router.get('/', auth, character.getChars);

/**
 * @path /user/character/reset - PATCH
 * @desc Updates character resets
 */

router.patch('/reset', auth, check.character.reset, validator, character.reset);

/**
 * @path /user/character/addstats - PATCH
 * @desc Updates character stats
 */

router.patch('/addstats', () => {
  console.log('object');
});

/**
 * @path /user/character/class - PATCH
 * @desc Updates character class
 */

router.patch('/class', () => {
  console.log('object');
});

/**
 * @path /user/character/name - PATCH
 * @desc Updates character name
 */

router.patch('/name', () => {
  console.log('object');
});

export default router;
