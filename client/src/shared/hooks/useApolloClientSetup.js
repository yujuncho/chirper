import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

import useAuth from "./useAuth";

export default function useApolloClientSetup() {
  const { authContext } = useAuth();
  const httpLink = createHttpLink({
    uri: "/graphql"
  });

  const authLink = setContext((_, { headers }) => {
    const storedUserData = localStorage.getItem("user");
    let authorization = "";
    if (storedUserData) {
      const user = JSON.parse(storedUserData);
      authorization = `Bearer ${user.token}`;
    }
    return {
      headers: {
        ...headers,
        authorization
      }
    };
  });

  const errorLink = onError(({ graphQLErrors }) => {
    if (graphQLErrors[0].extensions.code === "UNAUTHENTICATED") {
      authContext.signout();
      client.clearStore();
    }
  });

  let links = [errorLink, authLink, httpLink];
  const link = ApolloLink.from(links);

  const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
  });

  return client;
}
