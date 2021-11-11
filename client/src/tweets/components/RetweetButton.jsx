import { MdRepeat } from "react-icons/md";

import useAuth from "../../shared/hooks/useAuth";
import useRetweet from "../hooks/useRetweet";
import useDeleteRetweet from "../hooks/useDeleteRetweet";

import { colorKeys } from "../../shared/data/colors";
import ButtonIcon from "../../shared/components/ui/ButtonIcon";

export default function RetweetButton(props) {
  const { tweet } = props;
  const { authContext } = useAuth();
  const [retweet] = useRetweet({ tweet });

  const existingRetweet = tweet.retweets.find(
    t => t.author._id === authContext.user._id
  );

  const [deleteRetweet] = useDeleteRetweet({ tweet: existingRetweet });

  const handleRetweet = () => {
    if (existingRetweet) {
      deleteRetweet();
    } else {
      retweet();
    }
  };

  return (
    <ButtonIcon
      onClick={handleRetweet}
      title="Retweet"
      activeColor={!!existingRetweet && colorKeys.SUCCESS}
      hover={{
        color: colorKeys.SUCCESS,
        background: colorKeys.SUCCESS_OPAQUE
      }}
    >
      <MdRepeat />
    </ButtonIcon>
  );
}
