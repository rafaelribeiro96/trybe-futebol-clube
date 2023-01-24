import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';
import sorting from '../helpers/sorting';

export default class LeaderboardController {
  static async getAllHome(req: Request, res: Response): Promise<Response> {
    const result = await LeaderboardService.getAllHome();
    const ordered = sorting(result);
    return res.status(200).json(ordered);
  }

  static async getAllAway(req: Request, res: Response): Promise<Response> {
    const result = await LeaderboardService.getAllAway();
    const ordered = sorting(result);
    return res.status(200).json(ordered);
  }

  static async getAll(req: Request, res: Response): Promise<Response> {
    let result;
    if (req.query.type === 'home') {
      result = await LeaderboardService.getAllHome();
    } else if (req.query.type === 'away') {
      result = await LeaderboardService.getAllAway();
    } else {
      result = await LeaderboardService.getAll();
    }
    const ordered = sorting(result);
    return res.status(200).json(ordered);
  }
}
