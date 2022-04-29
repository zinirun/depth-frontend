import gql from "graphql-tag";

export const RESTORE_TASK = gql`
  mutation RestoreTask($id: ID!) {
    restoreTask(id: $id)
  }
`;
