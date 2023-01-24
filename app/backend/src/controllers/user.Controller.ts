import { Request, Response } from 'express';
import { UserCredentials } from '../interfaces/Iuser';
import * as userService from '../services/user.Service';

export async function login(req: Request, res: Response) {
  const userCredentials = req.body as UserCredentials;
  const { status, data, error } = await userService.login(userCredentials);
  if (error) {
    return res.status(status).json({ message: error.message });
  }
  return res.status(status).json(data);
}

export async function getUser(req: Request, res: Response) {
  const { user } = req.body;
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  return res.status(200).json({ role: user.dataValues.role });
}
