import gql from "graphql-tag";

export const DELETE_TASK_COMMENT = gql`
  mutation DeleteTaskComment($id: ID!) {
    deleteTaskComment(id: $id)
  }
`;
