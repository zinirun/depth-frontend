import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/react-hooks";

const httpLink = createHttpLink({
  uri: "/graphql",
  credentials: "same-origin",
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
