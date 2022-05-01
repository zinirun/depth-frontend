import { TaskFragment } from "api/fragments/task-fragment";
import gql from "graphql-tag";

export interface IMoveTaskChildInput {
  fromParentId?: string;
  toParentId?: string;
  childId: string;
  sortIndex?: number;
}

export const MOVE_TASK_CHILD = gql`
  ${TaskFragment}
  mutation MoveTaskChild($input: MoveTaskChildInput!) {
    moveTaskChild(input: $input) {
      ...TaskChildren
    }
  }
`;
