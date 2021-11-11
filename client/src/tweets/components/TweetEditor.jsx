import { useRef, useState } from "react";
import styled from "styled-components";

import useSaveTweet from "../hooks/useSaveTweet";

import ProfileImage from "./ProfileImage";
import Button from "../../shared/components/ui/Button";

const TweetInputContainer = styled.div`
  margin-top: 0.5rem;
  font-size: 1.25rem;
`;

const TweetInput = styled.div`
  &[contenteditable] {
    outline: 0px;
  }
`;

const TweetInputPlaceholder = styled.div`
  position: absolute;
  z-index: -1;
  opacity: 60%;
`;

const TweetButtonContainer = styled.div`
  margin-top: 1.5rem;
  display: flex;
  justify-content: flex-end;
`;

const TweetEditorContainer = styled.div`
  display: flex;
  min-height: ${props => (props.isReply ? "150px" : "")};
`;

const TweetInputAndActionsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default function TweetEditor(props) {
  const { inReplyToTweet, isReply, onSave } = props;

  const inputRef = useRef();
  const [text, setText] = useState("");

  const [saveTweet, { loading, error, data }] = useSaveTweet({
    text,
    inReplyToTweet,
    onComplete: () => {
      inputRef.current.innerText = "";
      setText("");
      onSave && onSave();
    }
  });

  let saveTweetData = null;
  if (data) {
    saveTweetData = inReplyToTweet ? data.replyToTweet : data.createTweet;
  }

  const handleSave = () => {
    saveTweet();
  };

  const handleChange = event => {
    const innerText = event.currentTarget.innerText;
    const newText = innerText === "\n" ? "" : innerText;
    setText(newText);
  };

  return (
    <TweetEditorContainer isReply={isReply}>
      <ProfileImage />
      <TweetInputAndActionsContainer isReply={isReply}>
        <TweetInputContainer>
          <TweetInputPlaceholder>
            {text.length > 0 ? "" : "What's happening?"}
          </TweetInputPlaceholder>
          <TweetInput
            ref={inputRef}
            role="textbox"
            tabIndex="0"
            contentEditable="true"
            onInput={handleChange}
          />
        </TweetInputContainer>
        <div>
          {saveTweetData && !saveTweetData.success && saveTweetData.message}
          {error && error.message}
        </div>
        <TweetButtonContainer>
          <Button primary onClick={handleSave}>
            {loading ? "Loading!" : isReply ? "Reply" : "Tweet"}
          </Button>
        </TweetButtonContainer>
      </TweetInputAndActionsContainer>
    </TweetEditorContainer>
  );
}
