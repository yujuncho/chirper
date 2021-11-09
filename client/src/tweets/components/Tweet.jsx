export default function Tweet(props) {
  const { tweet, retweet, retweetAuthor } = props;
  return (
    <div>
      {retweet && <div>{retweetAuthor} Retweeted</div>}
      <div>
        <span>{tweet.author.name}</span>
        <span>@{tweet.author.username}</span>
        <span>&#183;</span>
        <span>{tweet.createdAt}</span>
      </div>
      {tweet.inReplyToTweet && (
        <div>Replying to {tweet.inReplyToTweet.author.username}</div>
      )}
      <div>
        <span>{tweet.text}</span>
      </div>
      <div>
        <button>Reply</button>
        <button>Retweet</button>
      </div>
    </div>
  );
}
