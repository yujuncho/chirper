import { useApolloClient } from "@apollo/client";

import useAuth from "../../shared/hooks/useAuth";
import Timeline from "../components/Timeline";
import TweetEditor from "../components/TweetEditor";

export default function Home() {
  const { authContext } = useAuth();
  const apolloClient = useApolloClient();

  const signoutHandler = () => {
    authContext.signout();
    apolloClient.clearStore();
  };

  return (
    <div>
      <h1>Home</h1>
      <button onClick={signoutHandler}>Sign Out</button>
      <TweetEditor />
      <Timeline />
    </div>
  );
}
