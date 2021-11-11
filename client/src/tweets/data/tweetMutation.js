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
            username
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
  }
`;

const DELETE_RETWEET = gql`
  mutation DeleteRetweet($tweetId: ID!) {
    deleteRetweet(tweetId: $tweetId) {
      code
      success
      message
      deletedRetweet {
        _id
      }
      originalTweet {
        _id
        retweets {
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

const tweetMutation = {
  CREATE_TWEET,
  REPLY_TO_TWEET,
  RETWEET,
  DELETE_RETWEET
};

export default tweetMutation;
