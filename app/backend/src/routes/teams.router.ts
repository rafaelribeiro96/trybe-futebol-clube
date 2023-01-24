import { Router } from 'express';
import * as teamController from '../controllers/team.Controller';

const router = Router();

router.get('/', teamController.getAllTeams);
router.get('/:id', teamController.getSingleTeam);

export default router;
