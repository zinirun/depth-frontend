import gql from "graphql-tag";

type TaskOperation = "create" | "update" | "delete" | "move";

export interface TaskEvent {
  key: string;
  id: string;
  projectId: string;
  command: TaskOperation;
  companyId: string;
}

export const TASK_EVENT = gql`
  subscription TaskEvent {
    taskEvent {
      key
      id
      projectId
      command
      companyId
    }
  }
`;
