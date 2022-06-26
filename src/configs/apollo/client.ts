// import { createHttpLink, InMemoryCache } from "@apollo/react-hooks";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { split } from "@apollo/client/core";
import { getMainDefinition } from "@apollo/client/utilities";
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

// const httpLink = () =>
//   new HttpLink({
//     uri: "/graphql",
//     credentials: "same-origin",
//   });

// const wsLink = (token?: string) =>
//   new GraphQLWsLink({
//     uri: `/graphql`,
//     options: {
//       reconnect: true,
//       reconnectionAttempts: 5,
//       connectionParams: () => ({
//         authorization: token && `Bearer ${token}`,
//       }),
//     },
//   });

// const link = (token?: string) =>
//   split(
//     ({ query }) => {
//       const definition = getMainDefinition(query);
//       return (
//         definition.kind === "OperationDefinition" &&
//         definition.operation === "subscription"
//       );
//     },
//     wsLink(token),
//     httpLink()
//   );

// export const client = (token?: string) =>
//   new ApolloClient({
//     link: httpLink(),
//     cache: new InMemoryCache(),
//   });
