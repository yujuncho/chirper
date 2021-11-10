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
          _id
          username
          name
        }
        retweets {
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
  }
`;

const RETWEET = gql`
  mutation Retweet($tweetId: ID!) {
    retweet(tweetId: $tweetId) {
      code
      success
      message
      tweet {
        _id
        text
        createdAt
        author {
          _id
          username
          name
        }
        retweets {
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
  }
`;

const REPLY_TO_TWEET = gql`
  mutation ReplyToTweet($replyToTweetId: ID!, $replyText: String!) {
    replyToTweet(tweetId: $replyToTweetId, replyText: $replyText) {
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
        retweets {
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
            username
          }
        }
      }
    }
  }
`;

const tweetMutation = {
  CREATE_TWEET,
  RETWEET,
  REPLY_TO_TWEET
};

export default tweetMutation;
