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
          name
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
          name
        }
      }
    }
  }
`;

const userMutation = {
  CREATE_USER,
  LOGIN_USER
};

export default userMutation;
