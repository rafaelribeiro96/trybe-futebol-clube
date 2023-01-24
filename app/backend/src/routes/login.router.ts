import { Router } from 'express';
import validateJWT from '../auth/TokenHandler';
import validateFields from '../middlewares/user.middleware';
import * as userController from '../controllers/userController';

const router = Router();

router.post('/', validateFields, userController.login);
router.get('/validate', validateJWT, userController.getUser);

export default router;
