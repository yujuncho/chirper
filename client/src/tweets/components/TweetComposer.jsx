import { AiOutlineClose } from "react-icons/ai";
import { BsArrowLeft } from "react-icons/bs";
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

const TweetComposerHeaderLargeScreens = styled.div`
  @media (max-width: 768px) {
    & ${ButtonIcon} {
      display: none;
    }
  }
`;

const TweetComposerHeaderSmallScreens = styled.div`
  display: flex;
  justify-content: space-between;

  @media (min-width: 768px) {
    & ${ButtonIcon} {
      display: none;
    }
  }
`;

export default function TweetComposer(props) {
  const { tweet, onSave, onClick } = props;

  return (
    <Modal>
      <ModalHeader>
        <TweetComposerHeaderLargeScreens>
          <ButtonIcon onClick={onClick} title="Close">
            <AiOutlineClose />
          </ButtonIcon>
        </TweetComposerHeaderLargeScreens>
        <TweetComposerHeaderSmallScreens>
          <ButtonIcon onClick={onClick} title="Back">
            <BsArrowLeft />
          </ButtonIcon>
        </TweetComposerHeaderSmallScreens>
      </ModalHeader>
      <ModalBody>
        <Tweet tweet={tweet} replyingToTweet={true} />
        <TweetComposerEditorContainer>
          <TweetEditor
            inReplyToTweet={tweet}
            onSave={onSave}
            isReply={true}
            autoFocus={true}
          />
        </TweetComposerEditorContainer>
      </ModalBody>
    </Modal>
  );
}
