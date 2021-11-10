import styled from "styled-components";

import Tweet from "./Tweet";
import TweetEditor from "./TweetEditor";

const Modal = styled.div`
  position: fixed;
  top: 20vh;
  left: 5%;
  width: 90%;
  background-color: white;
  padding: 1rem;
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  z-index: 30;
  animation: slide-down 300ms ease-out forwards;
`;

export default function TweetReplier(props) {
  const { tweet, onSave, onClick } = props;

  return (
    <Modal>
      <button onClick={onClick}>Close</button>
      <Tweet tweet={tweet} replyingToTweet={true} />
      <TweetEditor inReplyToTweet={tweet} onSave={onSave} />
    </Modal>
  );
}
