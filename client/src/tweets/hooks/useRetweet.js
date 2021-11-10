import { useMutation } from "@apollo/client";
import tweetMutation from "../data/tweetMutation";

export default function useRetweet({ tweet }) {
  const variables = { tweetId: tweet._id };

  const update = (cache, result) => {
    const { data } = result;
    const newTweet = data.retweet.tweet;
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
  return useMutation(tweetMutation.RETWEET, {
    variables,
    update
  });
}
