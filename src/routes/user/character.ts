import { Router } from 'express';

// Validation
import validator from '../../middleware/validator';
import check from '../../checks/users';

// Controllers
import character from '../../controllers/user/character';

const router = Router();

/**
 * @path /user/character/reset - PATCH
 * @desc Updates character resets
 */

router.patch('/reset', () => {
  console.log('object');
});

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
