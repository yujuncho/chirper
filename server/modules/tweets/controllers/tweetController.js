const { AuthenticationError } = require("apollo-server-express");
const Tweet = require("../models/Tweet");

function getTweets(context) {
  console.log("Got all tweets!");
  return [];
}

function createTweet(text, context) {
  console.log(text);
  return {
    code: 201,
    success: true,
    message: "Tweeted!",
    tweet: null
  };
}

function retweet(tweetId, context) {
  console.log("Retweet: ", tweetId);
  return {
    code: 201,
    success: true,
    message: "Retweeted!",
    tweet: null
  };
}

function replyToTweet(tweetId, replyText, context) {
  console.log("Reply to ", tweetId, " with text ", replyText);
  return {
    code: 201,
    success: true,
    message: "Replied to a tweet!",
    tweet: null
  };
}

const tweetController = {
  getTweets,
  createTweet,
  retweet,
  replyToTweet
};

module.exports = tweetController;
