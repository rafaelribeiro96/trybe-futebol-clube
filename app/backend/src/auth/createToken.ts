import * as jwt from 'jsonwebtoken';
import { UserBody } from '../interfaces/Iuser';
import jwtConfig from '../middlewares/jwtConfig';

require('dotenv/config');

const secret = process.env.JWT_SECRET;

const generateToken = (user: UserBody) => jwt.sign({ ...user }, secret as jwt.Secret, jwtConfig);

export default generateToken;
