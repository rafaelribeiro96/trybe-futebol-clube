import { Router } from 'express';
import * as matchController from '../controllers/match.Controller';

const router = Router();

router.get('/', matchController.getAllMatches);

export default router;
