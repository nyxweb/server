import { Router } from 'express';

// Validation
import validator from '../../middleware/validator';
import check from '../../validation/users/extra';

// Auth
import auth from '../../middleware/auth';

// Controllers
import extra from '../../controllers/user/extra';

const router = Router();

/**
 * @path /user/extra/storage/moveitem - PATCH
 * @desc Updates storage/warehouse items
 */

router.patch(
  '/storage/moveitem',
  auth,
  check.moveItem,
  validator,
  extra.storage.moveItem
);

/**
 * @path /user/extra/resources/deposit - PATCH
 * @desc Deposits resources
 */

router.patch(
  '/resources/deposit',
  auth,
  check.deposit,
  validator,
  extra.resources.deposit
);

/**
 * @path /user/extra/resources/withdraw - PATCH
 * @desc Withdraws resources to warehouse
 */

router.patch(
  '/resources/withdraw',
  auth,
  check.withdraw,
  validator,
  extra.resources.withdraw
);

/**
 * @path /user/extra/auction - POST
 * @desc Makes a new bid for item
 */

// router.post('/auction', () => {
//   console.log('object');
// });

/**
 * @path /user/extra/market - PATCH
 * @desc Buy item from market
 */

router.patch('/market', auth, extra.buyMarketItem);

export default router;
