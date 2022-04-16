import gql from "graphql-tag";

export const ME = gql`
  query Me {
    me {
      _id
      company {
        _id
        name
        email
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
  }
`;
