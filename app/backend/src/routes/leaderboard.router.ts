import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

const router = Router();

router.get('/', LeaderboardController.getAll);
router.get('/home', LeaderboardController.getAllHome);
router.get('/away', LeaderboardController.getAllAway);

export default router;
