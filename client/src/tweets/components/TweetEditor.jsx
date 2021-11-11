import { Fragment, useRef, useState } from "react";
import styled from "styled-components";

import useSaveTweet from "../hooks/useSaveTweet";

import Button from "../../shared/components/ui/Button";

const TweetInputContainer = styled.div`
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
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
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
    <Fragment>
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
    </Fragment>
  );
}
