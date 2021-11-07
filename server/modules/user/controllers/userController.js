const { AuthenticationError } = require("apollo-server-express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const tokenSecret = process.env.JWT_SECRET || "local-secret";

async function getUsers(context) {
  if (!context.isAuth) {
    throw new AuthenticationError(context.message);
  }

  const users = await User.find({});
  return users;
}

async function createUser({ username, password }) {
  try {
    let existingUser = await User.findOne({ username });

    if (existingUser !== null) {
      return {
        code: 422,
        success: false,
        message: "Username already exists",
        data: null
      };
    }

    let hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      username,
      password: hashedPassword
    });

    let token = jwt.sign(
      { userId: newUser.id, username: newUser.username },
      tokenSecret,
      { expiresIn: "1h" }
    );
    return {
      code: 201,
      success: true,
      message: "Created a new user",
      data: {
        user: newUser,
        token
      }
    };
  } catch (error) {
    return {
      code: 500,
      success: false,
      message: error.message,
      data: null
    };
  }
}

async function loginUser({ username, password }) {
  try {
    let user = (await User.findOne({ username })) || { password: "" };
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return {
        code: 401,
        success: false,
        message: "Incorrect username or password",
        data: null
      };
    }

    let token = jwt.sign(
      { userId: user.id, username: user.username },
      tokenSecret,
      { expiresIn: "1h" }
    );
    return {
      code: 200,
      success: true,
      message: "Logged in user",
      data: {
        user,
        token
      }
    };
  } catch (error) {
    return {
      code: 500,
      success: false,
      message: error.message,
      data: null
    };
  }
}

const userController = {
  getUsers,
  createUser,
  loginUser
};

module.exports = userController;
