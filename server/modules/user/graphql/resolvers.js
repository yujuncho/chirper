const userController = require("../controllers/userController");

const userResolvers = {
  Query: {
    users: () => {
      return userController.getUsers();
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
