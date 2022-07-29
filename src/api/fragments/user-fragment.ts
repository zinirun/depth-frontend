import gql from "graphql-tag";

export const UserFragment = gql`
  fragment UserFragment on User {
    _id
    _access
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
        emoji
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
    emoji
    inviteStatus
    createdAt
    updatedAt
  }
`;
