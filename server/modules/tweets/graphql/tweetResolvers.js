const userController = require("../../user/controllers/userController");
const tweetController = require("../controllers/tweetController");
const retweetController = require("../controllers/retweetController");

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
    retweetTweet: ({ retweetTweet: tweetId }) => {
      return tweetController.getTweet(tweetId);
    },
    retweets: ({ _id: tweetId }) => {
      return tweetController.getRetweets(tweetId);
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
    replyToTweet: (_, { tweetId, replyText }, context) => {
      return tweetController.replyToTweet(tweetId, replyText, context);
    },
    retweet: (_, { tweetId }, context) => {
      return retweetController.retweet(tweetId, context);
    },
    deleteRetweet: (_, { tweetId }, context) => {
      return retweetController.deleteRetweet(tweetId, context);
    }
  }
};

module.exports = tweetResolvers;
