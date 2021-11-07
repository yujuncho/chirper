const jwt = require("jsonwebtoken");
const tokenSecret = process.env.JWT_SECRET || "local-secret";

async function authContext({ req }) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new Error("Missing token");
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      throw new Error("Invalid token format");
    }

    const decodedToken = jwt.verify(token, tokenSecret);
    if (!decodedToken) throw new Error("Invalid token");

    return {
      isAuth: true,
      message: "",
      user: {
        userId: decodedToken.userId,
        username: decodedToken.username
      }
    };
  } catch (error) {
    return {
      isAuth: false,
      message: error.message,
      user: null
    };
  }
}

module.exports = authContext;
