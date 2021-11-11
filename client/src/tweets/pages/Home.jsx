import { useApolloClient } from "@apollo/client";
import styled from "styled-components";

import useAuth from "../../shared/hooks/useAuth";
import Timeline from "../components/Timeline";
import TweetEditor from "../components/TweetEditor";

import Card from "../../shared/components/layout/Card";
import Nav from "../../shared/components/layout/Nav";

const HomeContainer = styled.div`
  max-width: 600px;
  margin: auto;
`;

export default function Home() {
  const { authContext } = useAuth();
  const apolloClient = useApolloClient();

  const signoutHandler = () => {
    authContext.signout();
    apolloClient.clearStore();
  };

  return (
    <HomeContainer>
      <Nav>
        <h1>Home</h1>
        <button onClick={signoutHandler}>Sign Out</button>
      </Nav>
      <Card>
        <TweetEditor />
      </Card>
      <Timeline />
    </HomeContainer>
  );
}
