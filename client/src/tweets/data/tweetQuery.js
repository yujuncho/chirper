import { gql } from "@apollo/client";

const GET_TWEETS = gql`
  query GetTweets {
    tweets {
      _id
      text
      createdAt
      author {
        username
        name
      }
      retweetTweet {
        _id
        text
        createdAt
        author {
          username
          name
        }
      }
      inReplyToTweet {
        _id
        author {
          username
        }
      }
    }
  }
`;

const tweetQuery = {
  GET_TWEETS
};

export default tweetQuery;
