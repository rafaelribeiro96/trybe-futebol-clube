import { compareSync } from 'bcryptjs';
import { UserCredentials, User } from '../interfaces/Iuser';
import createToken from '../auth/createToken';
import UserModel from '../database/models/User.model';

const errorMessage = 'Incorrect email or password';

export async function login(userCredentials: UserCredentials) {
  try {
    const user = await UserModel.findOne({ where: { email: userCredentials.email } });

    if (!user) { throw new Error(errorMessage); }
    const compare = compareSync(userCredentials.password, user.password);

    if (!compare) { throw new Error(errorMessage); }
    const token = createToken(user as User);

    return { status: 200, data: { token } };
  } catch (error) { return { status: 401, error: { message: errorMessage } }; }
}

export default login;
