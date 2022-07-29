import gql from "graphql-tag";

export const TaskTreeFragment = gql`
  fragment TaskTreeChildren on TaskTree {
    _id
    status
  }
`;
