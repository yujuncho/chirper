const { gql } = require("apollo-server-express");

const tweetTypeDefs = gql`
  extend type Query {
    tweets: [Tweet!]!
  }

  type Tweet {
    _id: ID!
    text: String
    createdAt: Date!
    author: User!
    retweetedBy: User
    inReplyToAuthor: User
    inReplyToTweet: Tweet
    replies: [Tweet!]!
  }

  extend type Mutation {
    createTweet(text: String!): TweetResponse!
    retweet(tweetId: ID!): TweetResponse!
    replyToTweet(tweetId: ID!, replyText: String!): TweetResponse!
  }

  type TweetResponse {
    code: Int!
    success: Boolean!
    message: String!
    tweet: Tweet
  }
`;

module.exports = tweetTypeDefs;
