const { gql } = require("apollo-server-express");
const _ = require("lodash");

const userTypeDefs = require("../modules/user/graphql/userTypeDefs");
const userResolvers = require("../modules/user/graphql/userResolvers");
const tweetTypeDefs = require("../modules/tweets/graphql/tweetTypeDefs");
const tweetResolvers = require("../modules/tweets/graphql/tweetResolvers");
const dateScalar = require("./dateScalar");

const baseTypeDefs = gql`
  scalar Date

  type Query
  type Mutation
`;

const baseResolvers = {
  Date: dateScalar
};

module.exports = {
  typeDefs: [baseTypeDefs, userTypeDefs, tweetTypeDefs],
  resolvers: _.merge(baseResolvers, userResolvers, tweetResolvers)
};
