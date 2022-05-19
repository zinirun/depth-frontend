import gql from "graphql-tag";

export const SET_TOKEN = gql`
  query SetToken($token: String!) {
    setToken(token: $token)
  }
`;
