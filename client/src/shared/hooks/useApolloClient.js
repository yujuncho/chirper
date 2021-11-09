import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

export default function useApolloClient() {
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

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });

  return client;
}
