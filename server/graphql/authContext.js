// TODO: Complete the authcontext
async function authContext({ req }) {
  // AUTHORIZATION
  let user;

  const header = req.headers.authorization || "";
  const token = header.split(" ")[1];

  if (token) {
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decodedUser) throw new AuthenticationError("Invalid token");

    user = decodedUser;
  }

  // // not found
  // if (!header) return { isAuth: false };

  // // token
  // const token: any = header.split(" ");

  // // token not found
  // if (!token) return { isAuth: false };

  // let decodeToken: any;

  // try {
  //   decodeToken = jwt.verify(token[1], privateKey);
  // } catch (err) {
  //   return { isAuth: false };
  // }

  return { loggedUser };
}
