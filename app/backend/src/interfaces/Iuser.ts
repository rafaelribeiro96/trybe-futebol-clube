interface UserBody {
  email: string;
  password: string;
}

interface UserCredentials extends UserBody {
  username: string;
  role: string;
}

interface User extends UserCredentials {
  id: number;
}

export { UserBody, UserCredentials, User };
