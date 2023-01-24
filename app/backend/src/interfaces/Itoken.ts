interface IToken {
  data: {
    id: number;
    email: string;
    password: string;
  };
  iat: number;
  exp: number;
}

export default IToken;
