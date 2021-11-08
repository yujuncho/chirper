const tweetController = require("../controllers/tweetController");

const tweetResolvers = {
  Query: {
    tweets: (_, __, context) => {
      return tweetController.getTweets(context);
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
