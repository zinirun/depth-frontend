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
