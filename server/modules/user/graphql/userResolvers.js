const tweetController = require("../../tweets/controllers/tweetController");
const userController = require("../controllers/userController");

const userResolvers = {
  Query: {
    users: (_, __, context) => {
      return userController.getUsers(context);
    }
  },
  User: {
    tweets: ({ _id: userId }) => {
      return tweetController.getTweetsByUserId(userId);
    }
  },
  Mutation: {
    createUser: (_, { username, password }) => {
      return userController.createUser(username, password);
    },
    loginUser: (_, { username, password }) => {
      return userController.loginUser(username, password);
    }
  }
};

module.exports = userResolvers;
