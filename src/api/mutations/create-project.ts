import gql from "graphql-tag";

export interface ICreateProjectInput {
  title: string;
  accesses: string[];
}
export const CREATE_PROJECT = gql`
  mutation ($project: CreateProjectInput!) {
    createProject(project: $project) {
      _id
    }
  }
`;
