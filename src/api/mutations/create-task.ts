import { TaskFragment } from "api/fragments/task-fragment";
import { IDateRange } from "configs/interfaces/common/date-range.interface";
import gql from "graphql-tag";

export interface ICreateTaskInput {
  projectId: string;
  parentTaskId?: string;
  sortIndex?: number;
  title: string;
  content?: string;
  deadline?: IDateRange;
  involvedUserIds?: string[];
}

export const CREATE_TASK = gql`
  ${TaskFragment}
  mutation CreateTopTask($task: CreateTaskInput!) {
    createTask(task: $task) {
      ...TaskChildren
    }
  }
`;
