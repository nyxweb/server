import { Router } from 'express';

// Controllers
import storage from '../../../controllers/user/extra/storage';
import auth from '../../../middleware/auth';

const router = Router();

/**
 * @PATH    /user/extra/storage/moveitem
 * @DESC    PATCH - moves an item
 */

router.patch('/moveitem', auth, storage.moveItem);

export default router;
