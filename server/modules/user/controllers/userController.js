const User = require("../models/User");

async function getUsers() {
  const users = await User.find({});
  return users;
}

async function createUser({ username, password }) {
  const newUser = new User({
    username,
    password
  });
  const savedUser = await newUser.save();

  return {
    code: 201,
    success: true,
    message: "Successfully created a new user!",
    user: savedUser
  };
}

const userController = {
  getUsers,
  createUser
};

module.exports = userController;
