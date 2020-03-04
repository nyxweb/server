import { Router } from 'express';

// Controllers
import password from '../../../controllers/user/account/password';

const router = Router();

/**
 * @PATH: /user/user/password
 */

router.get('/', password);

export default router;
