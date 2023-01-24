import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

require('dotenv/config');

const secret = process.env.JWT_SECRET;

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization: token } = req.headers;
    if (!token) throw new Error('Token not found');
    const user = jwt.verify(token, secret as jwt.Secret);
    req.body.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};
