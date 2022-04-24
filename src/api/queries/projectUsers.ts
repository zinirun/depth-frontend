import gql from "graphql-tag";

export const PROJECT_USERS = gql`
  query ProjectUsers($id: ID!) {
    projectUsers(id: $id) {
      _id
      email
      name
      role
      createdAt
      updatedAt
    }
  }
`;
