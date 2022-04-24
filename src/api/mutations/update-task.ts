import { TaskFragment } from "api/fragments/task-fragment";
import { IDateRange } from "configs/interfaces/common/date-range.interface";
import { TaskStatus } from "configs/interfaces/common/task.interface";
import gql from "graphql-tag";

export interface IUpdateTaskInput {
  id: string;
  title?: string;
  content?: string;
  deadline?: IDateRange;
  involvedUserIds?: string[];
  status?: TaskStatus;
}

export const UPDATE_TASK = gql`
  ${TaskFragment}
  mutation UpdateTask($task: UpdateTaskInput!) {
    updateTask(task: $task) {
      ...TaskChildren
      childrens {
        ...TaskChildren
      }
    }
  }
`;
