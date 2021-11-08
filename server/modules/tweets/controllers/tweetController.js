const { AuthenticationError } = require("apollo-server-express");
const mongoose = require("mongoose");
const User = require("../../user/models/User");
const Tweet = require("../models/Tweet");

async function getTweet(tweetId) {
  const tweet = await Tweet.findById(tweetId);
  return tweet;
}

async function getTweets(context) {
  if (!context.isAuth) {
    throw new AuthenticationError(context.message);
  }

  const tweets = await Tweet.find({});
  return tweets;
}

async function getTweetsByUserId(userId) {
  const tweets = await Tweet.find({ author: userId });
  return tweets;
}

async function getReplies(tweetId) {
  const tweets = await Tweet.find({ inReplyToTweet: tweetId });
  return tweets;
}

async function createTweet(text, context) {
  try {
    if (!context.isAuth) {
      throw new AuthenticationError(context.message);
    }

    let user = await User.findById(context.user.userId);

    let newTweet = new Tweet({
      text,
      author: user.id
    });

    user.tweets.push(newTweet.id);

    const sess = await mongoose.startSession();
    sess.startTransaction();
    await newTweet.save();
    await user.save();
    sess.commitTransaction();

    return {
      code: 201,
      success: true,
      message: "Tweeted!",
      tweet: newTweet
    };
  } catch (error) {
    let code = 500;
    if (error.extensions) {
      code = error.extensions.code === "UNAUTHENTICATED" && 422;
    }
    return {
      code,
      success: false,
      message: error.message,
      tweet: null
    };
  }
}

async function retweet(tweetId, context) {
  try {
    if (!context.isAuth) {
      throw new AuthenticationError(context.message);
    }

    let user = await User.findById(context.user.userId);

    return {
      code: 201,
      success: true,
      message: "Retweeted!",
      tweet: null
    };
  } catch (error) {
    let code = 500;
    if (error.extensions) {
      code = error.extensions.code === "UNAUTHENTICATED" && 422;
    }
    return {
      code,
      success: false,
      message: error.message,
      tweet: null
    };
  }
}

async function replyToTweet(tweetId, replyText, context) {
  try {
    if (!context.isAuth) {
      throw new AuthenticationError(context.message);
    }

    let user = await User.findById(context.user.userId);
    let inReplyToTweet = await Tweet.findById(tweetId);

    let newTweet = new Tweet({
      text: replyText,
      author: user.id,
      inReplyToTweet: inReplyToTweet.id
    });

    user.tweets.push(newTweet.id);
    inReplyToTweet.replies.push(newTweet.id);

    const sess = await mongoose.startSession();
    sess.startTransaction();
    await newTweet.save();
    await user.save();
    await inReplyToTweet.save();
    sess.commitTransaction();

    return {
      code: 201,
      success: true,
      message: "Replied to a tweet!",
      tweet: newTweet
    };
  } catch (error) {
    let code = 500;
    if (error.extensions) {
      code = error.extensions.code === "UNAUTHENTICATED" && 422;
    }
    return {
      code,
      success: false,
      message: error.message,
      tweet: null
    };
  }
}

const tweetController = {
  getTweet,
  getTweets,
  getTweetsByUserId,
  getReplies,
  createTweet,
  retweet,
  replyToTweet
};

module.exports = tweetController;
