import { useState } from "react";
import styled from "styled-components";

import useSaveTweet from "../hooks/useSaveTweet";

import ProfileImage from "./ProfileImage";
import Button from "../../shared/components/ui/Button";
import TweetEditorInput from "./TweetEditorInput";

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
  const { inReplyToTweet, isReply, onSave, autoFocus } = props;

  const [text, setText] = useState("");

  const [saveTweet, { loading, error, data }] = useSaveTweet({
    text,
    inReplyToTweet,
    onComplete: () => {
      setText("");
      onSave && onSave();
    }
  });

  let saveTweetData = null;
  if (data) {
    saveTweetData = inReplyToTweet ? data.replyToTweet : data.createTweet;
  }

  const handleSave = () => {
    if (text.length > 0) {
      saveTweet();
    }
  };

  const handleInputChange = updatedText => {
    setText(updatedText);
  };

  return (
    <TweetEditorContainer isReply={isReply}>
      <ProfileImage />
      <TweetInputAndActionsContainer isReply={isReply}>
        <TweetEditorInput
          text={text}
          onChange={handleInputChange}
          autoFocus={autoFocus}
        />
        <div>
          {saveTweetData && !saveTweetData.success && saveTweetData.message}
          {error && error.message}
        </div>
        <TweetButtonContainer>
          <Button
            primary={true}
            onClick={handleSave}
            isDisabled={text.length === 0}
          >
            {loading ? "Loading!" : isReply ? "Reply" : "Tweet"}
          </Button>
        </TweetButtonContainer>
      </TweetInputAndActionsContainer>
    </TweetEditorContainer>
  );
}
