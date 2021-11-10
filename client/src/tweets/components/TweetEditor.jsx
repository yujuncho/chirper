import { useRef, useState } from "react";
import styled from "styled-components";

import useSaveTweet from "../hooks/useSaveTweet";

const TweetInput = styled.div`
  background: black;
  color: white;
`;

export default function TweetEditor(props) {
  const { inReplyToTweet, onSave } = props;

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
    setText(event.currentTarget.innerText);
  };

  return (
    <div>
      <div>
        <TweetInput
          ref={inputRef}
          role="textbox"
          tabIndex="0"
          contentEditable="true"
          onInput={handleChange}
        />
      </div>
      <div>
        {saveTweetData && !saveTweetData.success && saveTweetData.message}
        {error && error.message}
      </div>
      <button onClick={handleSave}>{loading ? "Loading!" : "Tweet"}</button>
    </div>
  );
}
