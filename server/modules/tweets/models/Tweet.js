const { Types, Schema, model } = require("mongoose");

const tweetSchema = new Schema({
  text: {
    type: String,
    req: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  author: {
    type: Types.ObjectId,
    ref: "user",
    req: true
  },
  retweetTweet: {
    type: Types.ObjectId,
    ref: "tweet"
  },
  retweets: [this],
  inReplyToTweet: {
    type: Types.ObjectId,
    ref: "tweet"
  },
  replies: [this]
});

const Tweet = model("tweet", tweetSchema);

module.exports = Tweet;
