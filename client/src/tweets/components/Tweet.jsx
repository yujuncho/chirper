import { useState } from "react";
import TweetReplier from "./TweetReplier";
import RetweetButton from "./RetweetButton";

export default function Tweet(props) {
  const { tweet, isRetweet, retweetAuthor, replyingToTweet } = props;
  const [showTweetReplier, setShowTweetReplier] = useState(false);

  const handleReply = () => {
    setShowTweetReplier(true);
  };

  const closeTweetReplier = () => {
    setShowTweetReplier(false);
  };

  return (
    <div>
      {showTweetReplier && (
        <TweetReplier
          tweet={tweet}
          onSave={closeTweetReplier}
          onClick={closeTweetReplier}
        />
      )}
      {isRetweet && <div>{retweetAuthor} Retweeted</div>}
      <div>
        <span>{tweet.author.name}</span>
        <span>@{tweet.author.username}</span>
        <span>&#183;</span>
        <span>{tweet.createdAt}</span>
      </div>
      {/* Use css to swap the display order when replyingToTweet is true */}
      <div>
        {tweet.inReplyToTweet && (
          <div>Replying to @{tweet.inReplyToTweet.author.username}</div>
        )}
        <div>
          <span>{tweet.text}</span>
        </div>
      </div>
      {!replyingToTweet && (
        <div>
          <button onClick={handleReply}>Reply</button>
          <RetweetButton tweet={tweet} />
        </div>
      )}
    </div>
  );
}
