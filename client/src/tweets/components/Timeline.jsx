import { useQuery } from "@apollo/client";
import tweetQuery from "../data/tweetQuery";
import Tweet from "./Tweet";

import CardList from "../../shared/components/layout/CardList";
import Card from "../../shared/components/layout/Card";

export default function Timeline() {
  const { loading, error, data } = useQuery(tweetQuery.GET_TWEETS);

  let tweetList = [];
  if (data) {
    tweetList = data.tweets.map(tweet => {
      if (tweet.text !== null) {
        return (
          <Card key={tweet._id}>
            <Tweet tweet={tweet} />
          </Card>
        );
      } else {
        return (
          <Card key={tweet._id}>
            <Tweet
              tweet={tweet.retweetTweet}
              retweet={tweet}
              isRetweet={true}
            />
          </Card>
        );
      }
    });
  }

  if (loading) return <CardList>Loading!</CardList>;
  if (error) return <CardList>{error.message}</CardList>;
  return <CardList>{tweetList}</CardList>;
}
