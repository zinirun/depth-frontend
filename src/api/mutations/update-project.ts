import gql from "graphql-tag";

export const UPDATE_PROJECT = gql`
  mutation ($project: UpdateProjectInput!) {
    updateProject(project: $project) {
      _id
      title
    }
  }
`;
