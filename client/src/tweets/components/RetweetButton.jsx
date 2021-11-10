import useAuth from "../../shared/hooks/useAuth";
import useRetweet from "../hooks/useRetweet";

export default function RetweetButton(props) {
  const { tweet } = props;
  const { authContext } = useAuth();
  const [retweet] = useRetweet({ tweet });

  const handleRetweet = () => {
    retweet();
  };

  const isDisabled = tweet.retweets.find(t => {
    return t.author._id === authContext.user._id;
  });

  return (
    <button onClick={handleRetweet} disabled={!!isDisabled}>
      Retweet
    </button>
  );
}
