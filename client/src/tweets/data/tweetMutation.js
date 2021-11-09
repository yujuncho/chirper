import { gql } from "@apollo/client";

const CREATE_TWEET = gql`
  mutation CreateTweet($text: String!) {
    createTweet(text: $text) {
      code
      success
      message
      tweet {
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
  }
`;

const tweetMutation = {
  CREATE_TWEET
};

export default tweetMutation;
