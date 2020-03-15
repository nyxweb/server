import { Router } from 'express';

// Validation
// import validator from '../middleware/validator';
// import check from '../checks/characters';

// Controllers
import others from '../controllers/others';

const router = Router();

/**
 * @path /others/market/latest - GET
 * @desc Returns latest market items
 */

router.get('/market/latest', others.market.latest);

export default router;
