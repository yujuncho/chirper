import { gql } from "@apollo/client";

const GET_TWEETS = gql`
  query GetTweets {
    tweets {
      _id
      text
      createdAt
      author {
        _id
        username
        name
      }
      retweets {
        _id
        author {
          _id
          username
          name
        }
      }
      retweetTweet {
        _id
        text
        createdAt
        author {
          _id
          username
          name
        }
        retweets {
          _id
          author {
            _id
            username
            name
          }
        }
      }
      inReplyToTweet {
        _id
        author {
          _id
          username
          name
        }
      }
    }
  }
`;

const tweetQuery = {
  GET_TWEETS
};

export default tweetQuery;
