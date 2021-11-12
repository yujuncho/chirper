import { useApolloClient } from "@apollo/client";
import styled from "styled-components";

import useAuth from "../../shared/hooks/useAuth";
import Timeline from "../components/Timeline";
import TweetEditor from "../components/TweetEditor";

import Card from "../../shared/components/layout/Card";
import Nav from "../../shared/components/layout/Nav";
import Button from "../../shared/components/ui/Button";

const HomeContainer = styled.div`
  max-width: 600px;
  margin: auto;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
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
        <Button onClick={signoutHandler} small={true}>
          Sign Out
        </Button>
      </Nav>
      <Card>
        <TweetEditor />
      </Card>
      <Timeline />
    </HomeContainer>
  );
}
