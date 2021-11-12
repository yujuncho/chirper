import { useEffect, useRef } from "react";
import styled from "styled-components";

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

export default function TweetEditorInput(props) {
  const { text, onChange, autoFocus } = props;
  const inputRef = useRef(null);

  useEffect(() => {
    if (autoFocus) {
      inputRef.current.focus();
    }
  }, [autoFocus, inputRef]);

  useEffect(() => {
    if (text.length === 0) {
      inputRef.current.innerText = "";
    }
  }, [text, inputRef]);

  const handleChange = event => {
    const innerText = event.currentTarget.innerText;
    const newText = innerText === "\n" ? "" : innerText;
    onChange(newText);
  };

  return (
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
  );
}
