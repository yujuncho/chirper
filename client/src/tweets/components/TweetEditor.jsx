import { useState } from "react";
import styled from "styled-components";

import useSaveTweet from "../hooks/useSaveTweet";

import ProfileImage from "./ProfileImage";
import TweetEditorInput from "./TweetEditorInput";
import Button from "../../shared/components/ui/Button";
import LoadingSpinner from "../../shared/components/ui/LoadingSpinner";
import Callout from "../../shared/components/layout/Callout";
import colors, { colorKeys } from "../../shared/data/colors";

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
        {((saveTweetData && !saveTweetData.success) || error) && (
          <Callout color={colorKeys.DANGER_OPAQUE}>
            {saveTweetData && !saveTweetData.success && saveTweetData.message}
            {error && error.message}
          </Callout>
        )}
        <TweetButtonContainer>
          <Button
            primary={true}
            onClick={handleSave}
            isDisabled={text.length === 0}
          >
            {loading ? (
              <LoadingSpinner small={true} color={colors.LIGHT} />
            ) : (
              "Chirp"
            )}
          </Button>
        </TweetButtonContainer>
      </TweetInputAndActionsContainer>
    </TweetEditorContainer>
  );
}
