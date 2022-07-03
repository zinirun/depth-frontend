import { getMainDefinition } from "@apollo/client/utilities";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/react-hooks";
import { WebSocketLink } from "apollo-link-ws";
import { split } from "apollo-link";

const httpLink = createHttpLink({
  uri: "/graphql",
  credentials: "same-origin",
});

const wsLink = (token?: string) =>
  new WebSocketLink({
    // uri: `ws://localhost:5000/graphql`,
    uri: `wss://api.depth.so/graphql`,
    options: {
      reconnect: true,
      reconnectionAttempts: 5,
      connectionParams: () => ({
        authorization: token && `Bearer ${token}`,
      }),
    },
  });

const link = (token?: string) =>
  split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink(token),
    httpLink as any
  );

export const client = (token?: string) =>
  new ApolloClient({
    link: link(token) as any,
    cache: new InMemoryCache(),
  });
