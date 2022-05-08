import gql from "graphql-tag";

export interface IUpdateProjectInput {
  id: string;
  title: string;
  accesses: string[];
}

export const UPDATE_PROJECT = gql`
  mutation ($project: UpdateProjectInput!) {
    updateProject(project: $project) {
      _id
      title
      accesses {
        _id
        name
        email
      }
    }
  }
`;
