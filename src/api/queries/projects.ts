import gql from "graphql-tag";

export const PROJECTS = gql`
  query Projects {
    projects {
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
