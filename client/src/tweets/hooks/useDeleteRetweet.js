import { useMutation } from "@apollo/client";
import tweetMutation from "../data/tweetMutation";

export default function useDeleteRetweet({ tweet }) {
  const variables = { tweetId: tweet ? tweet._id : "" };

  const update = (cache, result) => {
    const { data } = result;
    const deletedRetweet = data.deleteRetweet.deletedRetweet;
    const originalTweet = data.deleteRetweet.originalTweet;
    if (deletedRetweet && originalTweet) {
      cache.evict({ _id: deletedRetweet._id });
      cache.gc();
    }
  };

  return useMutation(tweetMutation.DELETE_RETWEET, {
    variables,
    update
  });
}
