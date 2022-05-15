import gql from "graphql-tag";

export const UserFragment = gql`
  fragment UserFragment on User {
    _id
    company {
      _id
      name
      email
      users {
        authType
        oauthProvider
        oauthId
        email
        name
        role
        inviteStatus
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
    authType
    oauthProvider
    oauthId
    email
    name
    role
    inviteStatus
    createdAt
    updatedAt
  }
`;
