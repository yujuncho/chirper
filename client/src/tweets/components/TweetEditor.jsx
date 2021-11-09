import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useMutation } from "@apollo/client";

import tweetMutation from "../data/tweetMutation";

const TweetInput = styled.div`
  background: black;
  color: white;
`;

export default function TweetEditor() {
  const inputRef = useRef();
  const [text, setText] = useState("");
  const [createTweet, { loading, error, data }] = useMutation(
    tweetMutation.CREATE_TWEET,
    {
      variables: { text },
      update: (cache, { data: { createTweet } }) => {
        const newTweet = createTweet.tweet;
        if (newTweet) {
          cache.modify({
            fields: {
              tweets(existingTweets = []) {
                return [newTweet, ...existingTweets];
              }
            }
          });
        }
      }
    }
  );

  useEffect(() => {
    if (data && data.createTweet.success) {
      inputRef.current.innerText = "";
      console.log(inputRef.current.innerText);
      setText("");
    }
  }, [data]);

  const handleClick = () => {
    createTweet();
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
        {data && !data.loginUser.success && data.loginUser.message}
        {error && error.message}
      </div>
      <button onClick={handleClick}>{loading ? "Loading!" : "Tweet"}</button>
    </div>
  );
}
