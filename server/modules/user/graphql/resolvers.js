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
    }
  }
};

module.exports = userResolvers;
