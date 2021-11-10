import { useMutation } from "@apollo/client";
import tweetMutation from "../data/tweetMutation";

export default function useSaveTweet({ text, inReplyToTweet, onComplete }) {
  let mutation = tweetMutation.CREATE_TWEET;
  let variables = { text };
  if (inReplyToTweet) {
    mutation = tweetMutation.REPLY_TO_TWEET;
    variables = { replyToTweetId: inReplyToTweet._id, replyText: text };
  }

  const update = (cache, result) => {
    const { data } = result;
    const newTweet = inReplyToTweet
      ? data.replyToTweet.tweet
      : data.createTweet.tweet;
    if (newTweet) {
      cache.modify({
        fields: {
          tweets(existingTweets = []) {
            return [newTweet, ...existingTweets];
          }
        }
      });
    }
  };

  const onCompleted = data => {
    let saveTweetData = inReplyToTweet ? data.replyToTweet : data.createTweet;
    if (saveTweetData && saveTweetData.success) {
      onComplete && onComplete();
    }
  };

  return useMutation(mutation, {
    variables,
    update,
    onCompleted
  });
}
