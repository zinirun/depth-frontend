import gql from "graphql-tag";

export const CREATE_PROJECT = gql`
  mutation ($project: CreateProjectInput!) {
    createProject(project: $project) {
      _id
    }
  }
`;
