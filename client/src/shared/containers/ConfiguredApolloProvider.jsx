import { ApolloProvider } from "@apollo/client";
import useApolloClientSetup from "../hooks/useApolloClientSetup";

export default function ConfiguredApolloProvider({ children }) {
  const client = useApolloClientSetup();
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
