import gql from "graphql-tag";

export const PROJECT = gql`
  query Project($id: ID!) {
    project(id: $id) {
      _id
      title
      accesses {
        _id
        email
        name
        emoji
      }
      manager {
        _id
        email
        name
      }
      taskUpdatedAt
      createdAt
      updatedAt
    }
  }
`;
