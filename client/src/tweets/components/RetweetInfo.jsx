import { MdRepeat } from "react-icons/md";
import styled from "styled-components";
import FlexContainer from "../../shared/components/layout/FlexContainer";

import useAuth from "../../shared/hooks/useAuth";

const RetweetAuthor = styled.div`
  flex: 1;
  margin-left: 1rem;
  font-size: 0.9rem;
  opacity: 60%;
`;

const RetweetIconContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 48px;
  opacity: 60%;
`;

export default function RetweetInfo(props) {
  const { retweet } = props;
  const { authContext } = useAuth();

  return (
    <FlexContainer>
      <RetweetIconContainer>
        <MdRepeat />
      </RetweetIconContainer>
      <div>
        <RetweetAuthor>
          {retweet.author._id === authContext.user._id
            ? "You "
            : `${retweet.author.name} `}
          Retweeted
        </RetweetAuthor>
      </div>
    </FlexContainer>
  );
}
