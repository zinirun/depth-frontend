import gql from "graphql-tag";

export const ASSIGN_INVITE_WITH_OAUTH = gql`
  mutation AssignInviteWithOAuth($id: ID!, $name: String, $emoji: String) {
    assignInviteWithOAuth(id: $id, name: $name, emoji: $emoji) {
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
