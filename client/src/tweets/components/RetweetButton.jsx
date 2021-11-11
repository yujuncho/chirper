import { MdRepeat } from "react-icons/md";

import useAuth from "../../shared/hooks/useAuth";
import useRetweet from "../hooks/useRetweet";

import { colorKeys } from "../../shared/data/colors";
import ButtonIcon from "../../shared/components/ui/ButtonIcon";

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
    <ButtonIcon
      onClick={handleRetweet}
      disabled={!!isDisabled}
      title="Retweet"
      hover={{
        color: colorKeys.SUCCESS,
        background: colorKeys.SUCCESS_OPAQUE
      }}
    >
      <MdRepeat />
    </ButtonIcon>
  );
}
