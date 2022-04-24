import { TaskCommentFragment } from "api/fragments/task-comment-fragment";
import gql from "graphql-tag";

export interface ICreateTaskCommentInput {
  taskId: string;
  content: string;
}

export const CREATE_TASK_COMMENT = gql`
  ${TaskCommentFragment}
  mutation CreateTaskComment($comment: CreateTaskCommentInput!) {
    createTaskComment(comment: $comment) {
      ...TaskCommentFragment
    }
  }
`;
