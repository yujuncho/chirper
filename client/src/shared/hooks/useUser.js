import { gql } from "@apollo/client";

const CREATE_USER = gql`
  mutation CreateUser($username: String!, $password: String!, $name: String!) {
    createUser(username: $username, password: $password, name: $name) {
      code
      success
      message
      data {
        token
        user {
          _id
          username
        }
      }
    }
  }
`;

const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      code
      success
      message
      data {
        token
        user {
          _id
          username
        }
      }
    }
  }
`;

export default function useUser() {
  return {
    mutation: {
      CREATE_USER,
      LOGIN_USER
    }
  };
}
