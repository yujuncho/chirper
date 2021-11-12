import { useQuery } from "@apollo/client";
import tweetQuery from "../data/tweetQuery";
import Tweet from "./Tweet";

import CardList from "../../shared/components/layout/CardList";
import Card from "../../shared/components/layout/Card";
import LoadingSpinner from "../../shared/components/ui/LoadingSpinner";
import Callout from "../../shared/components/layout/Callout";
import { colorKeys } from "../../shared/data/colors";

export default function Timeline() {
  let { loading, error, data } = useQuery(tweetQuery.GET_TWEETS);
  let content = [];

  if (data) {
    content = data.tweets.map(tweet => {
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

  if (loading) {
    content = <LoadingSpinner style={{ padding: "1rem 0" }} />;
  }

  if (error) {
    content = (
      <Callout
        color={colorKeys.DANGER_OPAQUE}
        style={{
          maxWidth: "200px",
          margin: "auto",
          position: "absolute",
          width: "100%",
          left: "calc(50% - 100px)",
          bottom: "1.5rem"
        }}
      >
        Error: {error.message}
      </Callout>
    );
  }

  return <CardList>{content}</CardList>;
}
