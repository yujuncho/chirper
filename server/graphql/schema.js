const { gql } = require("apollo-server-express");
const _ = require("lodash");

const userTypeDefs = require("../modules/user/graphql/typeDefs");
const userResolvers = require("../modules/user/graphql/resolvers");
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
  typeDefs: [baseTypeDefs, userTypeDefs],
  resolvers: _.merge(baseResolvers, userResolvers)
};
