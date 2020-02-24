import { Router } from 'express';

// Validation
// import validator from '../middleware/validator';
// import check from '../checks/characters';

// Controllers
import others from '../controllers/others';

const router = Router();

/**
 * @PATH: /others/market/latest - GET
 * @DESC: Returns latest market items
 */

router.get('/market/latest', others.market.latest);

export default router;
