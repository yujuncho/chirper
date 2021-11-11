import { AiOutlineClose } from "react-icons/ai";
import styled from "styled-components";

import Modal from "../../shared/components/layout/Modal";
import ModalHeader from "../../shared/components/layout/ModalHeader";
import ModalBody from "../../shared/components/layout/ModalBody";
import ButtonIcon from "../../shared/components/ui/ButtonIcon";

import Tweet from "./Tweet";
import TweetEditor from "./TweetEditor";

const TweetComposerEditorContainer = styled.div`
  margin-top: 2rem;
  min-height: 150px;
`;

export default function TweetComposer(props) {
  const { tweet, onSave, onClick } = props;

  return (
    <Modal>
      <ModalHeader>
        <ButtonIcon onClick={onClick} title="Close">
          <AiOutlineClose />
        </ButtonIcon>
      </ModalHeader>
      <ModalBody>
        <Tweet tweet={tweet} replyingToTweet={true} />
        <TweetComposerEditorContainer>
          <TweetEditor inReplyToTweet={tweet} onSave={onSave} isReply={true} />
        </TweetComposerEditorContainer>
      </ModalBody>
    </Modal>
  );
}
