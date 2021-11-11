const { AuthenticationError } = require("apollo-server-express");
const mongoose = require("mongoose");
const User = require("../../user/models/User");
const Tweet = require("../models/Tweet");

async function retweet(tweetId, context) {
  if (!context.isAuth) {
    throw new AuthenticationError(context.message);
  }

  try {
    let user = await User.findById(context.user.userId);
    let retweetTweet = await Tweet.findById(tweetId);

    if (!retweetTweet) {
      return {
        code: 404,
        success: false,
        message: "Tweet to retweet not found",
        tweet: null
      };
    }

    let existingRetweet = await Tweet.find({
      author: user.id,
      retweetTweet: retweetTweet.id
    });

    if (existingRetweet.length > 0) {
      return {
        code: 409,
        success: false,
        message: "This tweet has already been retweeted!",
        tweet: null
      };
    }

    let newRetweet = new Tweet({
      author: user.id,
      retweetTweet: retweetTweet.id
    });

    user.tweets.push(newRetweet.id);
    retweetTweet.retweets.push(newRetweet.id);

    const sess = await mongoose.startSession();
    sess.startTransaction();
    await newRetweet.save();
    await user.save();
    await retweetTweet.save();
    sess.commitTransaction();

    return {
      code: 201,
      success: true,
      message: "Retweeted!",
      tweet: newRetweet
    };
  } catch (error) {
    return {
      code: 500,
      success: false,
      message: error.message,
      tweet: null
    };
  }
}

async function deleteRetweet(tweetId, context) {
  if (!context.isAuth) {
    throw new AuthenticationError(context.message);
  }

  try {
    let user = await User.findById(context.user.userId);
    let retweet = await Tweet.findById(tweetId);
    let originalTweet = await Tweet.findById(retweet.retweetTweet);

    if (!retweet) {
      return {
        code: 404,
        success: false,
        message: "Retweet to undo not found",
        deletedRetweet: null,
        originalTweet: null
      };
    }

    user.tweets.pull(retweet.id);
    originalTweet.retweets.pull(retweet.id);

    const sess = await mongoose.startSession();
    sess.startTransaction();
    await Tweet.deleteOne({ _id: retweet.id });
    await user.save();
    await originalTweet.save();
    sess.commitTransaction();

    return {
      code: 200,
      success: true,
      message: "Deleted retweet!",
      deletedRetweet: retweet,
      originalTweet
    };
  } catch (error) {
    return {
      code: 500,
      success: false,
      message: error.message,
      deletedRetweet: null,
      originalTweet: null
    };
  }
}

const retweetController = {
  retweet,
  deleteRetweet
};

module.exports = retweetController;
