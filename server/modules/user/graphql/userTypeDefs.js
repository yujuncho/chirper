const { gql } = require("apollo-server-express");

const userTypeDefs = gql`
  extend type Query {
    users: [User!]!
  }

  type User {
    _id: ID!
    username: String!
    password: String!
    name: String!
    createdAt: Date!
    tweets: [Tweet!]!
  }

  extend type Mutation {
    createUser(
      username: String!
      password: String!
      name: String!
    ): UserResponse!
    loginUser(username: String!, password: String!): UserResponse!
  }

  type UserResponse {
    code: Int!
    success: Boolean!
    message: String!
    data: UserPayload
  }

  type UserPayload {
    token: String!
    user: User
  }
`;

module.exports = userTypeDefs;
