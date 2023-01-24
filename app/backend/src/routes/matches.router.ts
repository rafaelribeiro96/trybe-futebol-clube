import { Router } from 'express';
import validateMatches from '../middlewares/match.Middleware';
import validateJWT from '../auth/TokenHandler';
import * as matchController from '../controllers/match.Controller';

const router = Router();

router.get('/', matchController.getMatch);
router.post('/', validateJWT, validateMatches, matchController.createMatch);
router.patch('/:id/finish', matchController.endMatch);
router.patch('/:id', matchController.modifyMatch);

export default router;
