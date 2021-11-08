const userController = require("../../user/controllers/userController");
const tweetController = require("../controllers/tweetController");

const tweetResolvers = {
  Query: {
    tweets: (_, __, context) => {
      return tweetController.getTweets(context);
    }
  },
  Tweet: {
    author: ({ author }) => {
      return userController.getUser(author);
    },
    inReplyToTweet: ({ inReplyToTweet: tweetId }) => {
      return tweetController.getTweet(tweetId);
    },
    replies: ({ _id: tweetId }) => {
      return tweetController.getReplies(tweetId);
    }
  },
  Mutation: {
    createTweet: (_, { text }, context) => {
      return tweetController.createTweet(text, context);
    },
    retweet: (_, { tweetId }, context) => {
      return tweetController.retweet(tweetId, context);
    },
    replyToTweet: (_, { tweetId, replyText }, context) => {
      return tweetController.replyToTweet(tweetId, replyText, context);
    }
  }
};

module.exports = tweetResolvers;
