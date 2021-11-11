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
    retweetTweet: Tweet
    retweets: [Tweet!]!
    inReplyToTweet: Tweet
    replies: [Tweet!]!
  }

  extend type Mutation {
    createTweet(text: String!): TweetResponse!
    replyToTweet(tweetId: ID!, replyText: String!): TweetResponse!
    retweet(tweetId: ID!): TweetResponse!
    deleteRetweet(tweetId: ID!): DeleteRetweetResponse!
  }

  type TweetResponse {
    code: Int!
    success: Boolean!
    message: String!
    tweet: Tweet
  }

  type DeleteRetweetResponse {
    code: Int!
    success: Boolean!
    message: String!
    deletedRetweet: Tweet
    originalTweet: Tweet
  }
`;

module.exports = tweetTypeDefs;
