import useAuth from "../../shared/hooks/useAuth";
import Timeline from "../components/Timeline";
import TweetEditor from "../components/TweetEditor";

export default function Home() {
  const { authContext } = useAuth();

  return (
    <div>
      <h1>Home</h1>
      <button
        onClick={() => {
          authContext.signout();
        }}
      >
        Sign Out
      </button>
      <TweetEditor />
      <Timeline />
    </div>
  );
}
