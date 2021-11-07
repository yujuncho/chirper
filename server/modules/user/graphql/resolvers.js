const userController = require("../controllers/userController");

const userResolvers = {
  Query: {
    users: (_, __, context) => {
      return userController.getUsers(context);
    }
  },

  Mutation: {
    createUser: (_, user) => {
      return userController.createUser(user);
    },
    loginUser: (_, user) => {
      return userController.loginUser(user);
    }
  }
};

module.exports = userResolvers;
