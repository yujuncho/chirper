import { useQuery } from "@apollo/client";
import tweetQuery from "../data/tweetQuery";
import Tweet from "./Tweet";

export default function Timeline() {
  const { loading, error, data } = useQuery(tweetQuery.GET_TWEETS);

  if (loading) return <div>Loading!</div>;
  if (error) return <div>{error.message}</div>;

  let tweetList = [];
  if (data) {
    tweetList = data.tweets.map(tweet => {
      if (tweet.text !== null) {
        return <Tweet key={tweet._id} tweet={tweet} />;
      } else {
        return (
          <Tweet
            key={tweet._id}
            tweet={tweet.retweetTweet}
            retweet={true}
            retweetAuthor={tweet.author.name}
          />
        );
      }
    });
  }

  return <div>{tweetList}</div>;
}
